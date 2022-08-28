import React from "react";
import styled from "styled-components";
import { MENU_ITEM_ENUM, useRoot } from "../../RootContext";
import { Button } from "../shared/Button";

export const MainMenu = () => {
  const { openMenuItem } = useRoot();

  return (
    <Modal>
      <Button onClick={() => openMenuItem(MENU_ITEM_ENUM.CAMERA)}>
        Camera
      </Button>
      <Button onClick={() => openMenuItem(MENU_ITEM_ENUM.CREATE_TEXT)}>
        Create Text File
      </Button>
      <Button onClick={() => openMenuItem(MENU_ITEM_ENUM.IMAGES)}>
        Images
      </Button>
      <Button onClick={() => openMenuItem(MENU_ITEM_ENUM.DOCUMENTS)}>
        Your documents
      </Button>
    </Modal>
  );
};

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 50px;
  z-index: 1;
  left: 0;
  width: 300px;
  height: 500px;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  * {
    display: block;
    margin: 10px 0 10px 0;
  }
`;
