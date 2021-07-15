import React from "react";
import styled from "styled-components";

import SideBar from "../components/SideBar";
import ChattingBar from "../components/ChattingBar";
import UserList from "../components/UserList";

import PostHome from "../pages/PostHome";
import ProfileHome from "../pages/ProfileHome";
import SignInSide from "../pages/LoginHome";
import SignUpSide from "../pages/SignupHome";

import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

const App = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(postActions.getpostDB());
  }, [])

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={SignInSide} />
        <Route path="/signup" exact component={SignUpSide} />
        <Route path="/main"><Container>
          <SideBar />
          <Route path="/main/home" exact component={PostHome} />
          <Route path="/main/user/:id" exact component={ProfileHome} />
          <ChattingBar />
          <UserList />
        </Container></Route>
      </ConnectedRouter>
    </React.Fragment>
  );
};

const Container = styled.div`
  /* border: 1px solid #f7f9f9; */
  background-color: #f7f9f9;
  display: flex;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
  /* align-items: stretch; */
  box-sizing: border-box;
  overflow: hidden;
`;

export default App;
