import bcrypt from 'bcrypt';

class UserModel {
    constructor(userId, name, email, password=null) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // 비밀번호 해시
    async hashPassword() {
        // bcrypt 같은 모듈을 사용하여 비밀번호 해싱
        this.password = await bcrypt.hash(this.password, 10);
    }
}


export { UserModel };