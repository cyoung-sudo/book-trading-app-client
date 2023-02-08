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

//----- Update given book
export const updateBook = async (id, ownerUsername, ownerId) => {
  const res = await api.request({
    method: "PUT",
    data: {
      ownerUsername,
      ownerId
    },
    url: `/api/book/${id}`
  });

  return res;
};

//----- Delete given book
export const deleteBook = async id => {
  const res = await api.request({
    method: "DELETE",
    url: `/api/book/${id}`
  });

  return res;
};

//----- Retrieve all books for user
export const getForUser = async userId => {
  const res = await api.request({
    method: "GET",
    url: `/api/book/user/${userId}`
  });

  return res;
};

//----- Delete all books for user
export const deleteForUser = async userId => {
  const res = await api.request({
    method: "DELETE",
    url: `/api/book/user/${userId}`
  });

  return res;
};