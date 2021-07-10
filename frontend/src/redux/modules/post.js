import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import moment from "moment";
import axios from "axios";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({post_id}));

const initialState = {
  list: [],
};


const initialPost = {
  text: "게시글1",
  create_at: moment().format("YYYY-MM-DD hh:mm:ss"),
  userId: "닉네임?아이디?",
  comments: "댓글",
};

const editPostDB = (post_id = null, post = {}) => {
 
};

const addPostDB = (contents = "", layout_type="a") => {
 
};

const getPostDB = (dispatch) => {
  
  axios.get('http://localhost:3000/api/posts',
).then(function (response) {
    console.log(response);
    dispatch(setPost(response.data))
  })
  .catch(function (error) {
    console.log(error);
  });
};

const deletePostDB = (id) => {
  
}

// 리듀서
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        //   데이터를 기존 데이터에 추가해요.
        draft.list.push(...action.payload.post_list);
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
      }),
      [DELETE_POST]: (state, action) => produce(state, (draft) => {
      }),

  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
};

export { actionCreators };
