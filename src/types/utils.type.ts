export interface SuccessResponse<Data> {
  limit: number;
  products: Data;
  skip: number;
  total: number;
}
