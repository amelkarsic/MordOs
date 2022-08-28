import React from "react";
import styled from "styled-components";

export const DIRECTORY_ENUM = {
  Desktop: 1,
  Documents: 2,
  Private: 3,
};

export const DIRECTORIES = [
  { key: DIRECTORY_ENUM.Desktop, value: "Desktop" },
  { key: DIRECTORY_ENUM.Documents, value: "Documents" },
  { key: DIRECTORY_ENUM.Private, value: "Private" },
];

export const DirectoryDropdown = ({
  changeDirectory,
  currentDirectory,
  defaultValue,
}) => {
  return (
    <>
      <label>Choose directory: </label>
      <Dropdown
        onChange={changeDirectory}
        value={currentDirectory}
        name="directory"
        defaultValue={defaultValue}
      >
        {DIRECTORIES.map((dir) => {
          return (
            <option value={dir.key} key={dir.key}>
              {dir.value}
            </option>
          );
        })}
      </Dropdown>
    </>
  );
};

const Dropdown = styled.select`
  margin-bottom: 20px;
`;
