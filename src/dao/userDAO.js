import mysql from "mysql2/promise";
import { dbConfig } from "./dbConfig.js";

class UserDAO {
  constructor() {
    // MySQL 데이터베이스 연결 설정
    this.db = mysql.createPool(dbConfig);
  }

  async getUserById(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await this.db.query(query, [id]);

    if (rows.length === 0) {
      return null; // 사용자가 존재하지 않음
    }

    return rows[0]; // 첫 번째 사용자 반환
  }

  // userId로 사용자 조회
  async getUserByUserId(userId) {
    const query = "SELECT * FROM users WHERE userId = ?";
    const [rows] = await this.db.query(query, [userId]);

    if (rows.length === 0) {
      return null; // 사용자가 존재하지 않음
    }

    return rows[0]; // 첫 번째 사용자 반환
  }

  // 새로운 사용자 추가
  async createUser(user) {
    const query =
      "INSERT INTO users (userId, user_name, email, password) VALUES (?, ?, ?, ?)";
    const [result] = await this.db.query(query, [
      user.userId,
      user.name,
      user.email,
      user.password,
    ]);

    return result.insertId; // 생성된 사용자의 ID 반환
  }

  // 사용자 ID로 사용자 삭제
  async deleteUser(userId) {
    const query = "DELETE FROM users WHERE userId = ?";
    const [result] = await this.db.query(query, [userId]);

    return result.affectedRows; // 삭제된 행 수 반환
  }

  async validatePassword(userId, password) {
    const query = "SELECT * FROM users WHERE userId = ? AND password = ?";
    const [rows] = await this.db.query(query, [userId, password]);

    return rows.length > 0; // 사용자가 존재하면 true, 아니면 false 반환
  }
}

export const userDAO = new UserDAO();
