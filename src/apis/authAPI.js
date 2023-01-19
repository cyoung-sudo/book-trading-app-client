import api from "./configs/axiosConfig";

//----- Signup user
export const signup = async (username, password) => {
  const res = await api.request({
    method: "POST",
    data: {
      username,
      password
    },
    url: "/api/auth/signup"
  });

  return res;
};

//----- Login user
export const login = async (username, password) => {
  const res = await api.request({
    method: "POST",
    data: {
      username,
      password
    },
    url: "/api/auth/login"
  });

  return res;
};

//----- Logout user
export const logout = async () => {
  const res = await api.request({
    method: "POST",
    url: "/api/auth/logout"
  });

  return res;
};

//----- Retrieve authenticated user
export const getUser = async () => {
  const res = await api.request({
    method: "GET",
    url: "/api/auth/user"
  });

  return res;
};