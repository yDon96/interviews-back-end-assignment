import { MockModel } from './mockDB.model';
import { IProduct } from '../../src/models/products/interfaces/products.interfaces';

export class ProductMockModel extends MockModel<IProduct> {
  protected entityStub = {
    _id: 'string',
    name: 'string',
    image: 'string',
    price: 0,
    availableQuantity: 0,
    category: 'string',
  };
}
