import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  defaultPaginationParams,
  Pagination,
  PaginationParams,
} from '../../common/decorators/paginationParams';
import { ProductsResponse } from './entities/products.entities';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getAllProducts(
    @PaginationParams() paginationParams: Pagination = defaultPaginationParams,
  ): Promise<ProductsResponse> {
    return new ProductsResponse(
      this.productsService.getProducts(paginationParams),
    );
  }
}
