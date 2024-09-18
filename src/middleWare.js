export const errorHandlingMiddleware = (error, req, res, next) => {
    res
        .status(error.status || 500)
        .send({
            name: error.name || 'Internal Server Error',
            message: error.message || '서버 내부에서 오류가 발생했습니다.'
        });
}