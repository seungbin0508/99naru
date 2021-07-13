import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = (props) => {
  const { label, placeholder, _onChange, type, multiLine, value } = props;

  if (multiLine) {
    return (
      <Grid>
        {/* {label && <Text margin="0px">{label}</Text>} */}
        <ElTextarea
          rows={3}
          // value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <ElInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          // value={value}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "What's happening?",
  type: "text",
  value: "",
  _onChange: () => {},
};

const ElTextarea = styled.textarea`
  border: none;
  width: 100%;
  padding: 12px 10px;
  box-sizing: border-box;
  resize: none;
  font-size: 20px;
  vertical-align: middle;
  overflow:hidden;
  ::placeholder {
  color: #536471;
  font-size: 20px;
}
  :focus {
    outline: none;
  }
`;

const ElInput = styled.input`
  border: none;
  width: 100%;
  padding: 12px 10px;
  box-sizing: border-box;
  font-size: 24px;
  ::placeholder {
  color: #536471;
  font-size: 20px;
  background-color: #f7f9f9;
  padding: 5px;
  border-radius: 20px;
}
  :focus {
    outline: none;
  }
`;

export default Input;
