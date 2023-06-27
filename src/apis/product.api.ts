import http from "../utils/http";

export const productApi = {
  getProducts: (params: { limit: string }) =>
    http.get("", {
      params,
    }),
  searchProducts: (params: { limit: string; q: string }) =>
    http.get("/search", {
      params,
    }),
};
