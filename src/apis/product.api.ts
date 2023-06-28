import { Product, ProductConfig } from "../types/product.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

export const productApi = {
  getProducts: (params: ProductConfig) =>
    http.get<SuccessResponse<Product[]>>("/products", {
      params,
    }),
  searchProducts: (params: ProductConfig) =>
    http.get<SuccessResponse<Product[]>>("products/search", {
      params,
    }),
};
