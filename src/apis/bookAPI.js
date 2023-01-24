import api from "./configs/axiosConfig";

//----- Retrieve all books
export const getAll = async () => {
  const res = await api.request({
    method: "GET",
    url: "/api/book"
  });

  return res;
};

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

//----- Delete given book
export const deleteBook = async id => {
  const res = await api.request({
    method: "DELETE",
    data: { id },
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

//----- Delete all books for user
export const deleteForUser = async userId => {
  const res = await api.request({
    method: "DELETE",
    url: `/api/book/${userId}`
  });

  return res;
};