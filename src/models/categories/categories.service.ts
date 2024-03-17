import { Injectable } from '@nestjs/common';
import { ICategory } from './interfaces/categories.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TCategorySchema } from './entities/category.entities';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories')
    private readonly categoryModel: Model<TCategorySchema>,
  ) {}
  async findAllCategories(): Promise<ICategory[]> {
    return this.categoryModel.find().exec();
  }
}
