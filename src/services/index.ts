import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL || "",
  timeout: 10 * 1000,
  auth: {
    username: process.env.NEXT_PRIVATE_API_USERNAME || "",
    password: process.env.NEXT_PRIVATE_API_PASSWORD || "",
  },
});

export const nextApi = axios.create({
  timeout: 600 * 1000,
});
