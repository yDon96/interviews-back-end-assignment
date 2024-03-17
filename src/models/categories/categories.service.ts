import { Injectable } from '@nestjs/common';
import { ICategory } from "./interfaces/categories.interfaces";

@Injectable()
export class CategoriesService {
  async findAllCategories(): Promise<ICategory> {
    return {
      name: '',
      elementsCount: 0,
    };
  }
}
