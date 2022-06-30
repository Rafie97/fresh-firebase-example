import Receipt from "../CartModels/Receipt.ts";
import Item from "../ItemModels/Item.ts";

export default interface User {
  id: string;
  name: string;
  family?: string[];
  wishlists?: Wishlist[];
  receipts?: Receipt[];
  cart?: Item[];
}

export interface Wishlist {
  id: string;
  items: string[];
}
