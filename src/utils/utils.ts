import { productApi } from "../apis/product.api";

export const fetchRepositories = async (
  skip: string | number,
  limit: string | number,
  search: string
) => {
  if (search) {
    const response = await productApi.searchProducts({
      limit,
      skip,
      q: search,
    });
    return response;
  } else {
    const response = await productApi.getProducts({ limit, skip });
    return response;
  }
};
