import { InferSchemaType, Schema, model, Model } from 'mongoose';
import { ICategory } from '../interfaces/categories.interfaces';

export interface CategorySchemaStatics {
  findProductsBy(categoryId: string): Promise<any>;
}

export const CategorySchema = new Schema<
  ICategory,
  Model<ICategory>,
  CategorySchemaStatics
>(
  {
    _id: String,
    name: String,
    elementsCount: Number,
  },
  {
    statics: {
      findProductsBy(categoryId: string) {
        console.log(categoryId);
        return [];
      },
    },
  },
);
export type TCategorySchema = InferSchemaType<typeof CategorySchema>;

export const CategoryModel = model('categories', CategorySchema);
