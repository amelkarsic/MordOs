import axios from "axios";

export const signIn = async (email, password) => {
  const tokenStr = btoa(`${email}:${password}`);

  return new Promise((resolve, reject) => {
    axios
      .post(`https://localhost:7233/api/Auth/login`, null, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};
