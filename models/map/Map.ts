import Aisle from "./Aisle.ts";
import { WallCoordinate } from "./Coordinate.ts";

export default interface Map {
  aisles: Aisle[];
  mapSize: MapSize;
  wallCoordinates: WallCoordinate[];
}

export interface MapSize {
  height: number;
  width: number;
}
