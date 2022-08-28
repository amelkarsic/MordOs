import React from "react";
import styled from "styled-components";
import { useRoot } from "../../RootContext";

export const CloseableCard = ({ children, title }) => {
  const { closeCurrentMenuItem } = useRoot();

  return (
    <Container>
      <Row>
        <ColumnLeft>
          <Dot onClick={closeCurrentMenuItem}>X</Dot>
        </ColumnLeft>
      </Row>

      <Content>
        <h3>{title}</h3>
        {children}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  border: 3px solid #f1f1f1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  max-height: 90%;
`;

const Row = styled.div`
  padding: 10px;
  background: #f1f1f1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const ColumnLeft = styled.div`
  width: 15%;
`;

const Dot = styled.button`
  height: 20px;
  width: 30px;
  background-color: #bbb;
  background: #ed594a;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
