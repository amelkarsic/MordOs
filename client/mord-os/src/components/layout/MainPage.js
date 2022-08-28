import React from "react";
import styled from "styled-components";
import { MenuItems, useRoot } from "../../RootContext";
import { Footer } from "./Footer";
import { CloseableCard } from "../menu/CloseableCard";

export const MainPage = () => {
  const { data } = useRoot();

  const renderItem = (itemId) => {
    const Component = MenuItems.find((step) => step.id === itemId).component;

    return <Component />;
  };

  const getItemTitle = (itemId) => {
    return MenuItems.find((step) => step.id === itemId).title;
  };

  return (
    <Wrapper>
      <CentralContent>
        {data.itemSelected && (
          <CloseableCard title={getItemTitle(data.itemSelected)}>
            {renderItem(data.itemSelected)}
          </CloseableCard>
        )}
      </CentralContent>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const CentralContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
