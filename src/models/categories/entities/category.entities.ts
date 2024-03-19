import { InferSchemaType, Schema, model, Model, Types } from 'mongoose';
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
    _id: Schema.Types.ObjectId,
    name: String,
    elementsCount: Number,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  {
    statics: {
      async findProductsBy(categoryId: string) {
        const result = await this.findById(categoryId)
          .populate('products')
          .exec();
        return result ? result.products : null;
      },
    },
  },
);

export type TCategorySchema = InferSchemaType<typeof CategorySchema>;

export const CategoryModel = model('categories', CategorySchema);
