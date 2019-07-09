import { Photo } from "./photo";
import { Model } from './Model';
import { Brand } from './brand';
export class Car {
  id: number;
  brandName: string;
  modelName: string;
  releaseYear: number;
  description: string;
  bodyType: string;
  userId:number;
  photos: Photo[];
}
