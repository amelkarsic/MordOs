import React, { useState } from "react";
import styled from "styled-components";
import { useRoot } from "../../../RootContext";
import { createDocument } from "../../../services/DocumentService";
import { Button } from "../../shared/Button";
import { DirectoryDropdown } from "./documents/DirectoryDropdown";

export const CreateText = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeCurrentMenuItem } = useRoot();

  const submit = async (e) => {
    e.preventDefault();

    const { title, text, directory } = e.target;

    setIsSubmitting(true);
    try {
      await createDocument({
        title: title.value,
        text: text.value,
        directory: directory.value,
      });

      closeCurrentMenuItem();
      alert("Your file is uploaded!");
    } catch (err) {
      console.err(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={submit}>
      <DirectoryDropdown />
      <label>
        <b>Title</b>
      </label>
      <input type="text" name="title" required />
      <label>
        <b>Your text</b>
      </label>
      <TextArea required name="text"></TextArea>
      <Button type="submit" disable={isSubmitting}>
        SUBMIT
      </Button>
    </Form>
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
