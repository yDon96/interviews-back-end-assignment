import { Injectable } from '@nestjs/common';
import { IProductsResponse } from './interfaces/products.interfaces';
import { Pagination } from '../../common/decorators/paginationParams';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProductSchemaStatics,
  TProductSchema,
} from './entities/products.entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product')
    private readonly productModel: Model<TProductSchema> & ProductSchemaStatics,
  ) {}
  async getProducts(paginationParams: Pagination): Promise<IProductsResponse> {
    const { page, limit } = paginationParams;
    const count = await this.productModel.countDocuments();
    const data = await this.productModel.getSlice(page, limit);
    return {
      data,
      dataInfo: {
        totalElements: count,
        currentOffset: paginationParams.page,
        dataLength: data.length,
      },
    };
  }
}
