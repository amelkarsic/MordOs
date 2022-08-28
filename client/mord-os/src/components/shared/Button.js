import React from "react";
import styled from "styled-components";

export const Button = (props) => {
  const { onClick, children } = props;

  return (
    <StyledButton {...props} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor ?? "#4caf50"};
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`;
