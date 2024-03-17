import { InferSchemaType, Schema, model, Model } from 'mongoose';
import { ICategory } from '../interfaces/categories.interfaces';

export const CategorySchema = new Schema<ICategory, Model<ICategory>>({
  _id: String,
  name: String,
  elementsCount: Number,
});
export type TCategorySchema = InferSchemaType<typeof CategorySchema>;

export const CategoryModel = model('categories', CategorySchema);
