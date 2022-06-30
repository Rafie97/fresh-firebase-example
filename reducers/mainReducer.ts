import { SET_PRODUCTS } from "./actions/actionTypes.ts";
import Item from "../models/item/Item.ts";

export type stateType = {
  products: Item[];
};

const initialState: stateType = {
  products: [],
};

export const mainReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
