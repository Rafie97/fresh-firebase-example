import { SET_PRODUCTS } from "./actionTypes.ts";
import Item from "../../models/item/Item.ts";

export const setProducts = (products: Item[]) => ({
  type: SET_PRODUCTS,
  payload: products,
});
