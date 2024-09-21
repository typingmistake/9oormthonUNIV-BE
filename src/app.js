import express from "express";
import { passport, sessionConfig } from "./auth.js";
import { errorHandlingMiddleware } from "./middleWare.js";
import router from "./controller.js";

// 미들웨어 설정
const app = express();
app.use(express.json());
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

// 템플릿 엔진 및 정적 파일 설정
app.set("view engine", "pug");
app.set("views", "views"); // 템플릿
app.use(express.static("static")); // 정적 파일

app.use("/", router);
app.use(errorHandlingMiddleware); // 에러 핸들링 미들웨어

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
