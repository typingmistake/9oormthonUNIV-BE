import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userDAO } from "./dao/userDAO.js";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

export const sessionConfig = session({
  secret: process.env.SESSION_SECRET_KEY, // 세션 암호화 키
  resave: false, // 세션이 수정되지 않으면 저장하지 않음
  saveUninitialized: false,
  cookie: {
    secure: false, // http 접속 허용
    maxAge: 1000 * 60 * 30, // 30분 (쿠키 만료 시간)
  },
});

passport.use(
  new LocalStrategy(async function (userId, password, done) {
    try {
      const user = await userDAO.getUserByUserId(userId); // 사용자 조회

      if (!user) {
        return done(null, false, {
          message: "아이디에 해당하는 사용자가 없습니다.",
        });
      }

      const valid = await userDAO.validatePassword(userId, password); // 비밀번호 검증
      if (!valid) {
        return done(null, false, { message: "비밀번호가 틀렸습니다." });
      }

      return done(null, user);
    } catch (err) {
      return done(err); // 에러 발생 시 done 함수에 에러 전달
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await userDAO.getUserById(id); // 사용자 조회
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export { passport };
