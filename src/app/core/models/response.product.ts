import { Product } from "@app/core/models/product";

export interface ProductResponse {
  message: string;
  data: Product;
}
