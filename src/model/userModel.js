import { hashPassword, validatePassword } from '../service/authService.js';

class UserModel {
    constructor(userId, name, email, password=null) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // 비밀번호 해시
    async hashPassword() {
        this.password = await hashPassword(this.password);
    }

    async validatePassword(inputPassword) {
        return await validatePassword(inputPassword, this.password);
    }
    
    // 중복된 아이디 존재 확인
    async getUserByUserId() {
        // DAO를 통해 데이터베이스에서 사용자 조회
        return await userDAO.getUserByUserId(this.userId);
    }
}


export { UserModel };