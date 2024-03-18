import { BadRequestException, Injectable } from '@nestjs/common';
import { ICategory } from './interfaces/categories.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CategorySchemaStatics,
  TCategorySchema,
} from './entities/category.entities';
import { IProduct } from '../products/interfaces/products.interfaces';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories')
    private readonly categoryModel: Model<TCategorySchema> &
      CategorySchemaStatics,
  ) {}
  async findAllCategories(): Promise<ICategory[]> {
    return this.categoryModel.find().exec();
  }

  async findProductsBy(categoryId: string): Promise<IProduct[]> {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw new BadRequestException('Invalid Category ID');
    }

    return this.categoryModel.findProductsBy(categoryId);
  }
}
