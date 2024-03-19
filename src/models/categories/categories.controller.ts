import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ICategory } from './interfaces/categories.interfaces';
import { IProduct } from '../products/interfaces/products.interfaces';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get('/')
  async getAllCategories(): Promise<ICategory[]> {
    return this.categoriesService.findAllCategories();
  }

  @Get('/:id/products')
  async getRelatedProducts(@Param('id') id: string): Promise<IProduct[]> {
    return this.categoriesService.findProductsBy(id);
  }
}
