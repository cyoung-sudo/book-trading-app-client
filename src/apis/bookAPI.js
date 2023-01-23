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