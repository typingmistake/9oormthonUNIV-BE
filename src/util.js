export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};


// 비밀번호 확인
export async function validatePassword(inputPassword, storedPasswordHash) {
    return inputPassword === storedPasswordHash;
}