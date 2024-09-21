import { hashPassword } from "../service/authService.js";
import { userDAO } from "../dao/userDAO.js";

class UserModel {
  constructor(userId, name, email, password = null) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // 비밀번호 해시
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }

  async validatePassword() {
    return await userDAO.validatePassword(this.userId, this.password);
  }

  // 중복된 아이디 존재 확인
  async getUserByUserId() {
    // DAO를 통해 데이터베이스에서 사용자 조회
    return await userDAO.getUserByUserId(this.userId);
  }

  async createUser() {
    // DAO를 통해 데이터베이스에 사용자 저장
    return await userDAO.createUser(this);
  }
}

export { UserModel };
