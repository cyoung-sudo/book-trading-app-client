import api from "./configs/axiosConfig";

//----- Retrieve users
export const getAll = async () => {
  const res = await api.request({
    method: "GET",
    url: "/api/user"
  });

  return res;
};