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
import { ProductsResponse } from './entities/productsResponse.entities';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getAllProducts(
    @PaginationParams() paginationParams: Pagination = defaultPaginationParams,
  ): Promise<ProductsResponse> {
    const result = await this.productsService.getProducts(paginationParams);
    return new ProductsResponse(result);
  }
}
