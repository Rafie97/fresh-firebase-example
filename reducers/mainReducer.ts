import { SET_PRODUCTS } from "./actions/actionTypes";
import Item from "../Models/Item";

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
