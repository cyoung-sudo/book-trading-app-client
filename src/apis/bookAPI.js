import api from "./configs/axiosConfig";

//----- Create book
export const create = async (title, description, ownerUsername, ownerId) => {
  const res = await api.request({
    method: "POST",
    data: {
      title,
      description,
      ownerUsername,
      ownerId
    },
    url: "/api/book"
  });

  return res;
};

//----- Retrieve all books
export const getAll = async () => {
  const res = await api.request({
    method: "GET",
    url: "/api/book"
  });

  return res;
};

//----- Retrieve all books for user
export const getForUser = async userId => {
  const res = await api.request({
    method: "GET",
    url: `/api/book/${userId}`
  });

  return res;
};