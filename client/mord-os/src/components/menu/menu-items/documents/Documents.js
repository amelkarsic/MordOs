import React, { useCallback, useEffect, useState } from "react";
import { Loader } from "../../../shared/Loader";
import {
  getDocuments as getDocumentsFromApi,
  deleteDocument,
} from "../../../../services/DocumentService";
import styled from "styled-components";
import { Button } from "../../../shared/Button";
import { EditDocument } from "./EditDocument";
import { DirectoryDropdown, DIRECTORY_ENUM } from "./DirectoryDropdown";

export const Documents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const [documents, setDocuments] = useState(null);
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [managedDocument, setManagedDocument] = useState(null);
  const [currentDirectory, setCurrentDirectory] = useState(
    DIRECTORY_ENUM.Desktop
  );

  //would add pagination, but this is just a POC
  const getDocuments = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await getDocumentsFromApi(isSortedAsc, currentDirectory);

      setDocuments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isSortedAsc, currentDirectory]);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  useEffect(() => {
    getDocuments();
  }, [isSortedAsc, managedDocument, currentDirectory, getDocuments]);

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

  const handleDeleteDocument = async (id) => {
    setIsDeleting(true);

    try {
      await deleteDocument(id);
      await getDocuments();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const changeDirectory = (e) => {
    setCurrentDirectory(e.target.value);
  };

  const renderTable = () => {
    if (isLoading) {
      return <Loader height="50px" width="50px" />;
    }

    if (documents?.length > 0) {
      return (
        <>
          <DirectoryDropdown
            changeDirectory={changeDirectory}
            currentDirectory={currentDirectory}
          />
          <Table>
            <thead>
              <tr>
                <th>
                  Title
                  <button onClick={changeSorting}>
                    Sort {isSortedAsc ? "descending" : "ascending"}
                  </button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => {
                return (
                  <tr key={doc.id}>
                    <td>{doc.title}</td>
                    <td>
                      <Button
                        onClick={() => setManagedDocument(doc)}
                        disabled={isDeleting}
                      >
                        VIEW / EDIT
                      </Button>
                      <Button
                        backgroundColor="red"
                        onClick={() => handleDeleteDocument(doc.id)}
                        disabled={isDeleting}
                      >
                        DELETE
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    }

    return (
      <>
        <div>
          <DirectoryDropdown
            changeDirectory={changeDirectory}
            currentDirectory={currentDirectory}
          />
        </div>
        NO DATA
      </>
    );
  };

  return managedDocument ? manageDocument() : renderTable();
};

const Table = styled.table`
  width: 80vh;
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
