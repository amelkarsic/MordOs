import React from "react";
import styled from "styled-components";
import { useRoot } from "../../RootContext";
import { MainMenu } from "../menu/MainMenu";
import { Button } from "../shared/Button";

export const Footer = () => {
  const { data, toggleMenu } = useRoot();

  return (
    <>
      <FooterDiv>
        <Button onClick={toggleMenu}> START</Button>
      </FooterDiv>

      {data.isMenuOpen && <MainMenu closeModal={toggleMenu} />}
    </>
  );
};

const FooterDiv = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #4c76b5;
  color: white;
  text-align: center;
  height: 50px;
`;
