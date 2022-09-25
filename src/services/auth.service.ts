const API_URL = "http://emphasoft-test-assignment.herokuapp.com";

export const login = (username: string, password: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{"username":"${username}","password":"${password}"}`,
  };

  return fetch(`${API_URL}/api-token-auth/`, options);
};

export const logout = () => {
  localStorage.removeItem("token");
};
