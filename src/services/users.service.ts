import authHeader from "./auth-header";

const API_URL = "http://emphasoft-test-assignment.herokuapp.com/api/v1/users/";

export const getUsers = () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  };

  return fetch(`${API_URL}`, options);
};
