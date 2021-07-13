import express from "express";
import Joi from "joi";
import { upload, S3 } from '../middlewares/imageUpload.js'
const router = express.Router();

const postUserschema = Joi.object({
  nickname: Joi.string()
    .regex(/^[가-힣a-zA-Z0-9]/)
    .min(3)
    .required(),
  loginId: Joi.string()
    .regex(/^[a-zA-Z0-9]/)
    .min(3)
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/)
    .min(6)
    .required(),
  // intro: Joi.string().min(3).required(),
});


// 회원가입 검사 및 등록
router.post("/", upload.single('image'), async (req, res) => {
  try {
    const { loginId, nickname, password } = await postUserschema.validateAsync(
      req.body
    );

    // const { passwordconfirm } = req.body;
    // if (password !== passwordconfirm) {
    //   return res
    //     .status(400)
    //     .send({ errorMessage: "비밀번호가 일치하지 않습니다." });
    // }
    // upload.single('img')
  if (!req.file) {
    profileImage = 'https://myh99bucket.s3.ap-northeast-2.amazonaws.com/basicProfile.png'
    profileImageKey = "basic"
  await User.create({
    loginId,
    nickname,
    password,
    profileImage,
    profileImageKey,
  });
  return res.status(201).send({ message: "회원가입을 축하합니다." })
}else{
  const profileImage = req.file.location;
  const profileImageKey = req.file.key
  await User.create({
    loginId,
    nickname,
    password,
    profileImage,
    profileImageKey,
  })
  return res.status(201).send({ message: "회원가입을 축하합니다." })
  }
}catch (err) {
  console.error(err);
  res
    .status(400)
    .send({ errorMessage: "회원가입 양식이 올바르지 않습니다." });
}
});

// 프로필 수정 정보 불러오기
router.get('/', (req, res) => {
  const { userId } = res.locals
  User.findById( userId ).exec()
  .then((user) => {
    res.json({ user })
  })
});

// 프로필 수정
router.put("/", upload.single("image"), async (req, res) => {
try{
  const { userId } = res.locals
  const { nickname, password } = await postUserschema.validateAsync(req.body);

if (!req.file) {
  await User.findByIdAndUpdate( userId, {$set: {
    nickname : nickname,
    password : password,
  }}).exec()

} else {
  userInfo = await User.findOne({ _id: userId });
  
  const key = userInfo["profileImageKey"];
  S3.deleteObject({
    Bucket: 'myh99bucket', 
    Key: key
  }, (err, data) => {
    if (err) { throw err; }
  })
  const newprofileImage = req.file.location;
  const newprofileImageKey = req.file.key;
  await User.findByIdAndUpdate( userId, {$set: {
    nickname : nickname,
    password : password,
    profileImage : newprofileImage,
    profileImageKey : newprofileImageKey,
  }}).exec()


  res.status(201).send({ message: "수정이 완료되었습니다." })
//todo 수정완료후 토큰 재발급? or 토큰제거후 로그인화면 리다이렉트후 다시 로그인?
}}catch(err){
console.log(err)
res.status(400).send({
  errorMessage: "수정 양식이 올바르지 않습니다."
})
}

});

export default router;
