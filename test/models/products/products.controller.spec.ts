import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../../src/models/products/products.controller';
import { ProductsService } from '../../../src/models/products/products.service';
import { IProducts } from '../../../src/models/products/interfaces/products.interfaces';
import {
  defaultPaginationParams,
  Pagination,
} from '../../../src/common/decorators/paginationParams';
import { IFetchResult } from '../../../src/common/interfaces/pagination.interfaces';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const data: IProducts[] = [
        {
          name: 'string',
          image: 'string',
          price: 0,
          availableQuantity: 0,
          category: 'string',
        },
      ];
      const dataInfo: IFetchResult = {
        currentOffset: 1,
        dataLength: 1,
        totalElements: 1,
      };
      const result = { data, dataInfo };
      jest.spyOn(service, 'getProducts').mockImplementation(() => result);

      expect(await controller.getAllProducts()).toEqual(result);
    });

    it('When no pagination params is defined, should call service with default pagination params', async () => {
      const spy = jest.spyOn(service, 'getProducts');
      await controller.getAllProducts();
      expect(spy).toBeCalledWith(defaultPaginationParams);
    });

    it('When pagination params is defined, should call service with custom pagination params', async () => {
      const spy = jest.spyOn(service, 'getProducts');
      const paginationParams: Pagination = {
        page: 2,
        size: 10,
        limit: 10,
        offset: 10,
      };
      await controller.getAllProducts(paginationParams);
      expect(spy).toBeCalledWith(paginationParams);
    });
  });
});
