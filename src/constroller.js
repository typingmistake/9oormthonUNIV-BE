import { passport } from './auth.js';
import { UserDTO } from '../shared/DTO/userDTO.js';
import { UserModel } from '../model/userModel.js';
import { userDAO } from '../dao/userDAO.js';

// 로그인 페이지 렌더링
router.get('/login', (req, res) => {
    res.render('signIn');
});

// 로그인 처리
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: true }, async (err, user, info) => {
        if (err) {
            return next(err); // 서버 오류 처리
        }

        if (!user) {
            return res.status(401).json({
                ok: false,
                message: info.message || '인증에 실패했습니다.'
            });
        }

        // 세션에 로그인 정보 저장
        req.login(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr); // 로그인 중 오류 발생
            }

            // 로그인 성공 시, 사용자 정보를 DTO로 변환
            const loggedInUser = new UserDTO({userId: user.userId, name: user.name, email: user.email});

            return res.json({
                ok: true,
                message: '로그인 성공',
                user: loggedInUser,
                redirectUrl: '/' // 메인 페이지로 리다이렉트
            });
        });
    })(req, res, next);
});

// 사용자 아이디 중복 조회
router.get('/checkUserId', async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await userDAO.getUserByUserId(userId);

        if (user) {
            return res.json({
                ok: false,
                message: '이미 존재하는 아이디입니다.'
            });
        }

        return res.json({
            ok: true,
            message: '사용 가능한 아이디입니다.'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: '아이디 중복 조회에 실패했습니다.',
            error: error.message
        });
    }
});

router.get('signUp', (req, res) => {
    res.render('signUp');
});

router.post('/signUp', async (req, res) => {
    const { userId, name, email, password } = req.body;

    try {
        // UserModel을 사용해 사용자 생성
        const newUser = new UserModel(userId, name, email, password);
        // 아이디 중복 확인
        const existingUser = await newUser.getUserByUserId();

        if (existingUser) {
            return res.status(409).json({
                ok: false,
                message: '이미 존재하는 아이디입니다.'
            });
        }

        await newUser.hashPassword();

        // DAO를 통해 데이터베이스에 사용자 저장
        await userDAO.createUser(newUser);

        return res.json({
            ok: true,
            message: '회원가입 성공'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: '회원가입에 실패했습니다.',
            error: error.message
        });
    }
});
