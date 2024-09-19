import { ImageTypes } from '../constants/commonConst';

export interface ImageOptions {
  id: number;
  order: number;
  type: ImageTypes;
  path: string;
  createAt: Date;
  updateAt: Date;
}
