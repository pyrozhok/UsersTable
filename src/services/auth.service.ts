const API_URL =
  "http://emphasoft-test-assignment.herokuapp.com/api-token-auth/";

export const login = (username: string, password: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{"username":"${username}","password":"${password}"}`,
  };

  return fetch(`${API_URL}`, options);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("is_logged_in");
};

export function setAuthHeader(token: string) {
  localStorage.setItem("token", JSON.stringify(token));
}

export function setLoggedIn() {
  localStorage.setItem("is_logged_in", JSON.stringify(true));
}
