export const errorHandlingMiddleware = (error, req, res, next) => {
  res.status(error.status || 500).send({
    name: error.name || "Internal Server Error",
    message: error.message || "서버 내부에서 오류가 발생했습니다.",
  });
};

// 로그인 여부 확인 미들웨어
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  // 302 리다이렉트를 사용해 로그인 페이지로 이동
  res.redirect("/login");
};
