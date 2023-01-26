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

//----- Delete trade
export const deleteTrade = async id => {
  const res = await api.request({
    method: "DELETE",
    url: `/api/trade/${id}`
  });

  return res;
};

//----- Delete all trades for given user
export const deleteForUser = async userId => {
  const res = await api.request({
    method: "DELETE",
    url: `/api/trade/user/${userId}`
  });

  return res;
};

//----- Retrieve all trades for given initiator
export const getForInitiator = async userId => {
  const res = await api.request({
    method: "GET",
    url: `/api/trade/initiator/${userId}`
  });

  return res;
};

//----- Retrieve all trades for given recipient
export const getForRecipient = async userId => {
  const res = await api.request({
    method: "GET",
    url: `/api/trade/recipient/${userId}`
  });

  return res;
};

//----- Delete all trades related to given book
export const deleteRelated = async bookId => {
  const res = await api.request({
    method: "DELETE",
    url: `/api/trade/deleteRelated/${bookId}`
  });

  return res;
};