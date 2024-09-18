import request from 'supertest';
import app from '../src/app';

describe('POST /signUp', () => {
    it('회원가입 성공 시 200 응답 및 성공 메시지 반환', async () => {
        const response = await request(app)
            .post('/signUp')
            .send({
                userId: 'test_user',
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'test_password'
            });
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('ok', true);
        expect(response.body).toHaveProperty('message', '회원가입 성공');
    });

    it('회원가입 시 서버 오류 시 500 응답 반환', async () => {
        const response = await request(app)
            .post('/signUp')
            .send({
                userId: 'error_test_user',
                name: 'Test Error User',
                email: 'errortestuser@example.com',
                password: 'test_password'
            });
        
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('ok', false);
        expect(response.body).toHaveProperty('message', '회원가입에 실패했습니다.');
    });
});