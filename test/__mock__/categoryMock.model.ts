import { MockModel } from './mockDB.model';
import { ICategory } from '../../src/models/categories/interfaces/categories.interfaces';
/* eslint-disable */
export class CategoryMockModel extends MockModel<ICategory> {
  protected entityStub = {
    _id: 'string',
    name: 'string',
    elementsCount: 0,
    products: []
  };

  async findProductsBy(categoryId: string) {
    return [];
  }
}
