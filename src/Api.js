import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const registerUser = (data) => axios.post(API_URL + "register/", data);
export const loginUser = (data) => axios.post(API_URL + "login/", data);
export const getProfile = (token) =>
  axios.get(API_URL + "profile/", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getReservation = (token) =>
  axios.get(API_URL + "reservation/", { headers: { Authorization: `Bearer ${token}` } });

export const createReservation = (token, data) =>
  axios.post(API_URL + "reservation/", data, { headers: { Authorization: `Bearer ${token}` } });

export const updateReservation = (token, data) =>
  axios.put(API_URL + "reservation/", data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteReservation = (token) =>
  axios.delete(API_URL + "reservation/", { headers: { Authorization: `Bearer ${token}` } });
