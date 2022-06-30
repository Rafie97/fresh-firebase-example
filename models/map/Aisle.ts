import Coordinate from "./Coordinate.ts";

export default interface Aisle {
  coordinate: Coordinate;
  products: string[];
}
