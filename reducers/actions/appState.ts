import { SET_PRODUCTS } from "./actionTypes";
import Item from "../../models/item/Item";

export const setProducts = (products: Item[]) => ({
  type: SET_PRODUCTS,
  payload: products,
});
