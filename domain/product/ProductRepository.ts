import { ProductDetails } from "./ProductDetails";
import { ProductItem } from "./ProductItem";

export interface ProductRepository {
  list(): Promise<ProductItem[]>;
  get(productId: string): Promise<ProductDetails>;
  delete(productId: string): Promise<void>;
}