import React, { useCallback, useEffect, useState } from "react";
import { Loader } from "../../../shared/Loader";
import { getDocuments as getDocumentsFromApi } from "../../../../services/DocumentService";
import styled from "styled-components";
import { Button } from "../../../shared/Button";
import { EditDocument } from "./EditDocument";

export const Documents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState(null);
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [managedDocument, setManagedDocument] = useState(null);

  //would add pagination, but this is just a POC
  const getDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await getDocumentsFromApi(isSortedAsc);

      setDocuments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isSortedAsc]);

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    getDocuments();
  }, [isSortedAsc, managedDocument]);

  const changeSorting = () => {
    setIsSortedAsc(!isSortedAsc);
  };

  const manageDocument = () => {
    return (
      <EditDocument
        document={managedDocument}
        goBack={() => setManagedDocument(null)}
      />
    );
  };

  const renderTable = () => {
    if (isLoading) {
      return <Loader height="50px" width="50px" />;
    }

    if (documents?.length > 0) {
      return (
        <Table>
          <tr>
            <th>
              Title{" "}
              <button onClick={changeSorting}>
                Sort {isSortedAsc ? "descending" : "ascending"}
              </button>
            </th>
            <th>Actions</th>
          </tr>
          {documents.map((doc) => {
            return (
              <tr key={doc.id}>
                <td>{doc.title}</td>
                <td>
                  <Button onClick={() => setManagedDocument(doc)}>
                    VIEW / EDIT
                  </Button>
                  <Button backgroundColor="red">DELETE</Button>
                </td>
              </tr>
            );
          })}
        </Table>
      );
    }

    return <>NO DATA</>;
  };

  return managedDocument ? manageDocument() : renderTable();
};

const Table = styled.table`
  width: 60vh;
  border: 1px solid black;
  th,
  td {
    border: 1px solid black;
  }

  td:last-child {
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;
  }
`;
