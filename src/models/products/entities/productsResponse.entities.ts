import { IProduct, IProductsResponse } from '../interfaces/products.interfaces';
import { Exclude, Expose } from 'class-transformer';
import {
  IFetchResult,
  PaginationResponse,
} from '../../../common/interfaces/pagination.interfaces';
import { getPaginationResponseFrom } from '../../../common/utils/paginationUtils';

export class ProductsResponse implements IProductsResponse {
  data: IProduct[];
  @Exclude()
  dataInfo: IFetchResult;

  @Expose()
  get pagination(): PaginationResponse {
    return getPaginationResponseFrom(this.dataInfo);
  }

  constructor(partial: Partial<IProductsResponse>) {
    Object.assign(this, partial);
  }
}
