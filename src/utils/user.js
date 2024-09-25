import Cookies from "js-cookie";

const url = import.meta.env.VITE_URL;

// sign Up

export const signUp = async (username, email, password) => {
  console.log(url);
  const res = await fetch(`${url}user/addUser`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });

  const data = await res.json();

  return data;
};

// Log In

export const logIn = async (username, password) => {
  const res = await fetch(`${url}user/logIn`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const data = await res.json();
  const userData = data.user;
  Cookies.set("jwt-token", userData.token, { expires: 7, path: "/" });
  return userData;
};

export const authCheck = async (jwt) => {
  const res = await fetch(`${url}user/authCheck`, {
    method: "GET",
    headers: {
      "Content-Type": "application-json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
};
