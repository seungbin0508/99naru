import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import {IdCheck, NickCheck, pwdCheck} from "../shared/common";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignupSide() {
  const classes = useStyles();
  // const Idinput = useRef();
  // console.log(Idinput.focus)
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [nick, setNick] = React.useState("");
  const [duplicate, setduplicate] = React.useState(false);
  const goSignin = () => {
    window.location.href = "/"
  }
  const duplicateCheck = () => {
    if (id===""||nick===""){
      window.alert("빈 칸을 채워주세요!")
      return;
    }
    if (id.length < 3||!IdCheck(id)) {
      window.alert("영어와 숫자만 입력해주세요! 최소 3글자!")
      return;
    }
    if (nick.length < 3||!NickCheck(nick)) {
      window.alert("한글,영어,숫자만 입력가능합니다! 최소 3글자!")
      return;
    }
    axios
    .post(`http://13.209.13.200/api/duplicate`, {
      loginId : `${id}`,
      nickname : `${nick}`,
    },)
    .then((res) => {
      console.log(res)
      {setduplicate(res.status === 200)}
      console.log(res)
      window.alert("확인 성공!")
    }).catch(function(err) {
    	console.error(err)
      window.alert("아이디 또는 닉네임이 이미 존재합니다!")
    });
  }

  const signup = () => {
  if (pwd==="" || pwd_check==="") {
    window.alert("전부 채워주세요!");
    return;
  }
  if (pwd !== pwd_check) {
    window.alert("비밀번호가 일치하지 않습니다!");
    return;
  }
  if (pwd.length < 6||!pwdCheck(pwd)) {
    window.alert("특수문자,영어,숫자를 최소한 1개 씩 입력해주세요! 최소 6글자 입니다!")
    return;
  }
  console.log(id, pwd, nick)
  dispatch(userActions.signupDB(id, pwd, nick))
};



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <form className={classes.form}>

            <TextField
              disabled={duplicate}
              onChange={(e) => {setId(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ID"
              label="ID"
              autoComplete="email"
              autoFocus
            />
            <TextField
              disabled={duplicate}
              onChange={(e) => {setNick(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="NickName"
            />
              <Button
              onClick={duplicateCheck}
              disabled={duplicate}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              아이디/닉네임 중복확인
            </Button>

            <TextField
              onChange={(e) => {setPwd(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              onChange={(e) => {setPwdCheck(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              onClick={signup}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={ !duplicate }
            >
              회원가입
            </Button>
            <Button
              onClick={goSignin}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              로그인 하러가기
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}