import api from "./configs/axiosConfig";

//----- Retrieve users
export const getAll = async () => {
  const res = await api.request({
    method: "GET",
    url: "/api/user"
  });

  return res;
};

//----- Retrieve given user
export const getUser = async id => {
  const res = await api.request({
    method: "GET",
    url: `/api/user/${id}`
  });

  return res;
};

//----- Edit given user
export const editUser = async (id, fullName, city, state) => {
  const res = await api.request({
    method: "PUT",
    data: {
      fullName,
      city,
      state
    },
    url: `/api/user/${id}`
  });

  return res;
};

//----- Delete given user
export const deleteUser = async id => {
  const res = await api.request({
    method: "DELETE",
    url: `/api/user/${id}`
  });

  return res;
};