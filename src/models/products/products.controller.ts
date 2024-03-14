import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProducts } from './interfaces/products.interfaces';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/')
  async getAllProducts(): Promise<IProducts[]> {
    return this.productsService.getProducts();
  }
}
