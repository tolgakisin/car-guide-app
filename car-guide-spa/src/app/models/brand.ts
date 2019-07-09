import { Model } from "./model";
import { Car } from "./car";
export class Brand {
  id: number;
  name: string;
  cars: Car[];
  models: Model[];
}
