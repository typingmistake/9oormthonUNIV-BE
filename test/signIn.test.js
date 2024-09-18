import request from 'supertest';
import app from '../src/app';


describe('POST /login', () => {
    it('로그인 성공 시 200 응답 및 성공 메시지 반환', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                userId: 'test_user',
                password: 'test_password'
            });
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('ok', true);
        expect(response.body).toHaveProperty('message', '로그인 성공');
        expect(response.body.user).toHaveProperty('userId', 'test_user');
    });

    it('잘못된 비밀번호 입력 시 401 응답 반환', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                userId: 'test_user',
                password: 'wrong_password'
            });
        
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('ok', false);
        expect(response.body).toHaveProperty('message', '비밀번호가 틀렸습니다.');
    });

    it('존재하지 않는 사용자로 로그인 시 401 응답 반환', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                userId: 'nonexistent_user',
                password: 'test_password'
            });
        
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('ok', false);
        expect(response.body).toHaveProperty('message', '아이디에 해당하는 사용자가 없습니다.');
    });
});
