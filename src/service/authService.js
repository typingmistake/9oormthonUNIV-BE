import bcrypt from 'bcrypt';

// 비밀번호 검증 로직
export async function validatePassword(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
};

export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
};