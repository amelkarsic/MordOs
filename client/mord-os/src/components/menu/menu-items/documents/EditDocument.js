import React, { useState } from "react";
import styled from "styled-components";
import { editDocument } from "../../../../services/DocumentService";
import { Button } from "../../../shared/Button";
import { DirectoryDropdown } from "./DirectoryDropdown";

export const EditDocument = ({ document, goBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e) => {
    //definitely would implement "dirty" mechanism to check if field values were changed

    e.preventDefault();
    const { title, text, directory } = e.target;

    setIsSubmitting(true);
    try {
      await editDocument({
        id: document.id,
        title: title.value,
        text: text.value,
        directory: directory.value,
      });

      alert("Your file is edited successfully!");
      goBack();
    } catch (err) {
      console.err(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <EditingTitle>Editing "{document.title}" document</EditingTitle>

      <Form onSubmit={submit}>
        <DirectoryDropdown defaultValue={document.directory} />
        <label>
          <b>Title</b>
        </label>
        <input
          type="text"
          name="title"
          defaultValue={document.title}
          required
        />
        <label>
          <b>Your text</b>
        </label>
        <TextArea required name="text" defaultValue={document.text}></TextArea>
        <ButtonBar>
          <Button type="submit" disable={isSubmitting}>
            SUBMIT
          </Button>
          <Button
            type="button"
            disable={isSubmitting}
            onClick={goBack}
            backgroundColor="red"
          >
            BACK
          </Button>
        </ButtonBar>
      </Form>
    </>
  );
};

const TextArea = styled.textarea`
  min-width: 40vh;
  min-height: 20vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  * {
    display: block;
    margin: 10px 0 10px 0;
  }
`;

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  * {
    margin: 10px;
  }
`;

const EditingTitle = styled.h3`
  color: #4c76b5;
`;
