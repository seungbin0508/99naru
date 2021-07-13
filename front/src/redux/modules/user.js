import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import jwt_decode from "jwt-decode"; // install jwt-decode for token decode


const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user_id) => ({ user_id })); //회원가입 시 ?

if(sessionStorage.getItem("MY_SESSION")===null){
sessionStorage.setItem("MY_SESSION", "byJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGVhZDRiYjQwMzg2NzcxOTYyYzNjNTEiLCJuaWNrbmFtZSI6InRlc3QxMjM0NSIsImlhdCI6MTYyNjE3MTg5OCwiZXhwIjoxNjI2MTc0ODk4fQ.WZriXGU0tbbH7fvNSVn6Gj952ADlOd95Nu6udZjBtjo")
console.log(sessionStorage.getItem("MY_SESSION"))  
window.location.href = "/"
}

const decoded = jwt_decode(`${sessionStorage.getItem("MY_SESSION")}`);
const nickname = decoded.nickname
const user_id = decoded.userId

const initialState = {
  nick_name: nickname,
  user_id: user_id,
};

const loginDB = (id, pwd) => {
  return function (dispatch, getState, {history}) {
    axios
    .post("http://localhost:3000/api/signin", {
      loginId: id,
      password: pwd,
    })
    .then((res) => {
      sessionStorage.setItem("MY_SESSION", res.data.token);
      dispatch(setUser(id))
      // history.push("/main/home");
      window.location.href = "/main/home";
    });
  }
};

const signupDB = (id, pwd, nickname) => {
    return function (dispatch, getState, {history}) {
      axios
      .post("http://localhost:3000/api/signup", {
        loginId: id,
        password: pwd,
        nickname: nickname,
      })
      .then((res) => {
        dispatch(loginDB(id,pwd))
      });
    }
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_id = action.payload.user;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        sessionStorage.removeItem("MY_SESSION");
      window.location.href = "/"
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  logOut,
  getUser,
  signupDB,
  loginDB,
};

export { actionCreators };
