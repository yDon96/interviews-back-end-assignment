import { IFetchResult } from '../../../common/interfaces/pagination.interfaces';

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  availableQuantity: number;
  category: string;
}

export interface IProductsResponse {
  data: IProduct[];
  dataInfo: IFetchResult;
}
