import React, { useEffect, useState } from "react";
import { Loader } from "../../shared/Loader";
import { getDocuments as getDocumentsFromApi } from "../../../services/DocumentService";
import styled from "styled-components";
import { Button } from "../../shared/Button";

export const Documents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    //would add pagination, but this is just a POC

    async function getDocuments() {
      try {
        setIsLoading(true);
        const { data } = await getDocumentsFromApi();

        setDocuments(data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }

    getDocuments();
  }, []);
  console.log(isLoading);
  const renderer = () => {
    if (isLoading) {
      return <Loader height="50px" width="50px" />;
    }

    if (documents?.length > 0) {
      return (
        <Container>
          <h3>Document Title</h3>
          {documents.map((doc) => {
            return (
              <File>
                <b>{doc.title}</b>
                <Button>EDIT</Button>
                <Button backgroundColor="red">DELETE</Button>
              </File>
            );
          })}
        </Container>
      );
    }

    return <>NO DATA</>;
  };

  return renderer();
};

const File = styled.div`
  border: 1px solid grey;
  height: 5vh;
  width: 50vh;
  display: flex;
  align-items: center;

  * {
    width: 20vh;
    margin-left: 5vh;
  }
`;

const Container = styled.div`
  div {
    margin-bottom: 10px;
  }
`;
