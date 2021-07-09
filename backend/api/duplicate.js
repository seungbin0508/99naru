import express from "express";

const router = express.Router();
const User = require("../models/user");
const multer = multer();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//   loginId, nickname 회원가입 중복체크
router.post("/", multer.none(), async (req, res) => {
  const { loginId, nickname } = req.body;

  const existUser = await User.find({
    $and: [{ $or: [{ nickname }, { loginId }] }],
  });
  if (existUser.length) {
    res.status(400).send(false);
  } else {
    res.status(200).send(true);
  }
});

export default router;
