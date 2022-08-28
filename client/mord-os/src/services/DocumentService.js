import axios from "axios";

export const createDocument = async (data) => {
  return await axios.post(`https://localhost:7233/api/Document`, data);
};

export const getDocuments = async (isSortedAsc, dir) => {
  return await axios.get(
    `https://localhost:7233/api/Document?isSortedAsc=${isSortedAsc}&directory=${dir}`
  );
};

export const editDocument = async (data) => {
  return await axios.put(`https://localhost:7233/api/Document`, data);
};

export const deleteDocument = async (id) => {
  return await axios.delete(`https://localhost:7233/api/Document/${id}`);
};
