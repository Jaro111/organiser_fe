import Cookies from "js-cookie";

const url = import.meta.env.VITE_URL;

// sign Up

export const signUp = async (username, email, password) => {
  console.log(url);
  const res = await fetch(`${url}/user/addUser`, {
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
  const res = await fetch(`${url}/user/logIn`, {
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

// Authorization
export const authCheck = async (jwt) => {
  const res = await fetch(`${url}/user/authCheck`, {
    method: "GET",
    headers: {
      "Content-Type": "application-json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const data = await res.json();
  return data;
};

// get all users

export const getAllUsers = async (token) => {
  const res = await fetch(`${url}/user/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application-json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  const userData = data.users;
  return userData;
};

export const updateUser = async (choice, update, password, token) => {
  const res = await fetch(`${url}/user/updateUser`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      choice: choice,
      update: update,
      password: password,
    }),
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export const sendResetLink = async (email) => {
  const res = await fetch(`${url}/user/resetLink`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });

  const data = await res.json();

  return data;
};

export const resetPassword = async (token, password) => {
  const res = await fetch(`${url}/user/resetPassword/${token}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
    }),
  });

  const data = await res.json();

  return data;
};
