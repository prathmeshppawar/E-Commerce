import axios from "axios";
const BASE_URL = "http://localhost:4000/api/";

let TOKEN = "";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo) {
  TOKEN = userInfo.accessToken
}
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
