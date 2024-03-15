import { Injectable } from '@nestjs/common';
import { IProductsResponse } from './interfaces/products.interfaces';
import { Pagination } from '../../common/decorators/paginationParams';

@Injectable()
export class ProductsService {
  getProducts(paginationParams: Pagination): IProductsResponse {
    const data = [];
    return {
      data,
      dataInfo: {
        totalElements: 0,
        currentOffset: paginationParams.page,
        dataLength: data.length,
      },
    };
  }
}
