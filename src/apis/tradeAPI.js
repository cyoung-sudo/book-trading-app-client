import api from "./configs/axiosConfig";

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