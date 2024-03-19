import { InferSchemaType, Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces/products.interfaces';

export interface ProductSchemaStatics {
  getSlice(page: number, limit: number): Promise<any>;
}

export const ProductSchema = new Schema<
  IProduct,
  Model<IProduct>,
  ProductSchemaStatics
>(
  {
    _id: Schema.Types.ObjectId,
    name: String,
    image: String,
    price: Number,
    availableQuantity: Number,
    category: {
      type: String,
      ref: 'categories',
    },
  },
  {
    statics: {
      getSlice(page: number, limit: number) {
        return this.find({})
          .lean()
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();
      },
    },
  },
);
export type TProductSchema = InferSchemaType<typeof ProductSchema>;

export const ProductModel = model('product', ProductSchema);
