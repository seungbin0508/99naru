import express from "express";
import postsRouter from "./posts.js";
import commentsRouter from "./comments";
import signupRouter from "./signup";
import duplicateRouter from "./duplicate";
import signinRouter from "./signin";

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

// 회원가입 중복검사 로그인 경로
router.use("/signup", signupRouter);
router.use("/duplicate", duplicateRouter);
router.use("/sigin", signinRouter);

export default router;
