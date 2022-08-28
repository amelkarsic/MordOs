import React, { useState } from "react";
import styled from "styled-components";
import { useRoot } from "../RootContext";
import { signIn } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { authenticate } = useRoot();

  const submit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    setIsSubmitting(true);

    signIn(email.value, password.value)
      .then(() => {
        authenticate();
        navigate("/");
      })
      .catch(() => setError("Invalid email or password"))
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <StyledForm onSubmit={submit}>
        {error && <Error>{error}</Error>}
        <label>
          <b>Email</b>
        </label>
        <input type="email" placeholder="Enter Email" name="email" required />
        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />
        <SubmitButton disabled={isSubmitting} type="submit">
          Submit
        </SubmitButton>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
`;

const Error = styled.div`
  color: red;
`;
