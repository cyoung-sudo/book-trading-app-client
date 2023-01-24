import api from "./configs/axiosConfig";

//----- Retrieve all trades
export const getAll = async () => {
  const res = await api.request({
    method: "GET",
    url: "/api/trade"
  });

  return res;
};

//----- Create trade
export const create = async (initiatorUsername, initiatorId, offer, recipientUsername, recipientId, request) => {
  const res = await api.request({
    method: "POST",
    data: {
      initiatorUsername,
      initiatorId,
      offer,
      recipientUsername,
      recipientId,
      request
    },
    url: "/api/trade"
  });

  return res;
};