import React from "react";
import styled from "styled-components";
import {
  IoChatboxOutline,
  IoChatbox,
  IoLogOutOutline,
  IoPersonOutline,
  IoPerson,
  IoConstructOutline,
  IoHome,
  IoHomeOutline,
  IoPeopleOutline,
  IoPeople,
} from "react-icons/io5";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";


const SideBar = (props) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userActions.logOut());
  }
  const goMyHome = () => {
    window.location.href = "/main/home"
  }
  const goMyPage = () => {
    window.location.href = "/main/user/:id"
  }
  const goMyChat = () => {
    window.location.href = "/main"
  }
  return (
    <React.Fragment>
      <Container>
        <IconWrap>
          <IoHomeOutline onClick={goMyHome}/>
        </IconWrap>
        <IconWrap>
          <IoPersonOutline onClick={goMyPage}/>
        </IconWrap>
        <IconWrap>
          <IoChatboxOutline onClick={goMyChat}/>
        </IconWrap>
        <IconWrap>
          <IoPeopleOutline />
        </IconWrap>
        <IconWrap>
          <IoLogOutOutline onClick={logout}/>
        </IconWrap>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 10%;
  height: 100%;
  border-top: 3px solid #f7f9f9;
  border-right: 3px solid #f7f9f9;
`;


const IconWrap = styled.div`
  width: 100%;
  margin: 2rem 0px;
  text-align: center;
  font-size: 2rem;
  color: #1da1f2;
  cursor: pointer;
`;

export default SideBar;
