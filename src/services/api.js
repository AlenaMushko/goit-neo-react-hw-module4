import axios from "axios";

import config from "../config/config";

const api = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    Authorization: `Client-ID ${config.ACCESS_KEY}`,
  },
});

export const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await api.get("/search/photos", {
      params: {
        query: query.trim(),
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("fetchImages API error:", error?.message);
    throw new Error(error);
  }
};
