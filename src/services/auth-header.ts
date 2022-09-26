export function authHeader() {
  const tokenStr = localStorage.getItem("token");
  let token = null;
  if (tokenStr) token = JSON.parse(tokenStr);

  if (token) {
    return "Token " + token;
  } else {
    return "";
  }
}

export function isLoggedIn() {
  const loggedInStr = localStorage.getItem("is_logged_in");
  if (loggedInStr) return true;
  return false;
}
