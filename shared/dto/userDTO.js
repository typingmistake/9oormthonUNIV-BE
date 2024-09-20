class UserDTO {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
    }
}

class UserSignUpDTO {
    constructor(userId, name, email, password) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password; // 회원가입 시에만 비밀번호 포함
    }
}

export { UserDTO, UserSignUpDTO };