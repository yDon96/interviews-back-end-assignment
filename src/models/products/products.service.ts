import { Injectable } from '@nestjs/common';
import { IProducts } from './interfaces/products.interfaces';

@Injectable()
export class ProductsService {
  getProducts(): IProducts[] {
    return [];
  }
}
