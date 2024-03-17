import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ICategory } from './interfaces/categories.interfaces';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get('/')
  async getAllCategories(): Promise<ICategory> {
    return this.categoriesService.findAllCategories();
  }
}
