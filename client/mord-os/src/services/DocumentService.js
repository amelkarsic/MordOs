import axios from "axios";

export const createDocument = async (data) => {
  return await axios.post(`https://localhost:7233/api/Document`, data);
};

export const getDocuments = async () => {
  return await axios.get(`https://localhost:7233/api/Document`);
};
