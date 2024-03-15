import { IFetchResult } from '../../../common/interfaces/pagination.interfaces';

export interface IProducts {
  name: string;
  image: string;
  price: number;
  availableQuantity: number;
  category: string;
}

export interface IProductsResponse {
  data: IProducts[];
  dataInfo: IFetchResult;
}
