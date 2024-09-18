import { passport } from './auth.js';

router.get('/login', (req, res) => {
    res.render('signIn');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: true }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ ok: false, message: info.message });
        }

        // 사용자 세션에 로그인 정보 저장
        req.login(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }

            // 로그인 성공 응답
            return res.json({
                ok: true,
                message: '로그인 성공',
                user: { id: user.id, userId: user.userId, name: user.name },
                redirectUrl: '/'
            });
        });
    })(req, res, next);
});




