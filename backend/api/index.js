import express from "express";
import auth from "../middlewares/auth-middleware.js";
import postsRouter from "./posts.js";
import commentsRouter from "./comments.js";
import signupRouter from "./signup.js";
import signinRouter from "./signin.js";
import duplicateRouter from "./duplicate.js";
import socialRouter from "./social_signup.js";

const router = express.Router();

router.use("/signin", signinRouter);
router.use("/signup", signupRouter);
router.use(auth);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/duplicate", duplicateRouter);
router.use("/google", socialRouter);
router.use("/github", socialRouter);
router.use("/kakao", socialRouter);

export default router;
