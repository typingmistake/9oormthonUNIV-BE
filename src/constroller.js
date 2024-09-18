import { passport } from './auth.js';
import { UserDTO } from '../shared/DTO/userDTO.js';
import { userDAO } from './DAO/userDAO.js';

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
            const loggedInUser = new UserDTO(user.id, user.userId, user.name);

            return res.json({
                ok: true,
                message: '로그인 성공',
                user: loggedInUser,
                redirectUrl: '/' // 메인 페이지로 리다이렉트
            });
        });
    })(req, res, next);
});

// 사용자 정보 조회
router.get('/user', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            ok: false,
            message: '인증되지 않았습니다.'
        });
    }

    try {
        const userId = req.user.id;
        const user = await userDAO.getUserById(userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: '사용자를 찾을 수 없습니다.'
            });
        }

        // 사용자 정보를 DTO로 변환하여 응답
        const userData = new UserDTO(user.id, user.userId, user.name);
        return res.json({
            ok: true,
            user: userData
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: '서버 오류가 발생했습니다.'
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
