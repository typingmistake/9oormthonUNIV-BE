import mysql from 'mysql2/promise';
import dbConfig from '../config/dbConfig.js';

class UserDAO {
    constructor() {
        // MySQL 데이터베이스 연결 설정
        this.db = mysql.createPool(dbConfig);
    }

    // userId로 사용자 조회
    async getUserByUserId(userId) {
        const query = 'SELECT * FROM users WHERE userId = ?';
        const [rows] = await this.db.query(query, [userId]);

        if (rows.length === 0) {
            return null; // 사용자가 존재하지 않음
        }

        return rows[0]; // 첫 번째 사용자 반환
    }

    // 새로운 사용자 추가
    async createUser(user) {
        const query = 'INSERT INTO users (userId, name, email, password) VALUES (?, ?, ?, ?)';
        const [result] = await this.db.query(query, [user.userId, user.name, user.email, user.password]);

        return result.insertId; // 생성된 사용자의 ID 반환
    }

    // 사용자 ID로 사용자 삭제
    async deleteUser(userId) {
        const query = 'DELETE FROM users WHERE userId = ?';
        const [result] = await this.db.query(query, [userId]);

        return result.affectedRows; // 삭제된 행 수 반환
    }

    // 사용자 정보 업데이트
    async updateUser(user) {
        const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE userId = ?';
        const [result] = await this.db.query(query, [user.name, user.email, user.password, user.userId]);

        return result.affectedRows; // 업데이트된 행 수 반환
    }
}

export const userDAO = new UserDAO();
