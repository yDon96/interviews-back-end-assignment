import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../../src/models/products/products.controller';
import { ProductsService } from '../../../src/models/products/products.service';
import { IProduct } from '../../../src/models/products/interfaces/products.interfaces';
import {
  defaultPaginationParams,
  Pagination,
} from '../../../src/common/decorators/paginationParams';
import { IFetchResult } from '../../../src/common/interfaces/pagination.interfaces';
import { getModelToken } from '@nestjs/mongoose';
import { ProductMockModel } from '../../__mock__/productMock.model';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let result;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getModelToken('product'),
          useClass: ProductMockModel,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);

    const data: IProduct[] = [
      {
        _id: 'string',
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
    result = { data, dataInfo };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      jest.spyOn(service, 'getProducts').mockResolvedValue(result);

      expect(await controller.getAllProducts()).toEqual(result);
    });

    it('When no pagination params is defined, should call service with default pagination params', async () => {
      const spy = jest.spyOn(service, 'getProducts').mockResolvedValue(result);
      await controller.getAllProducts();
      expect(spy).toBeCalledWith(defaultPaginationParams);
    });

    it('When pagination params is defined, should call service with custom pagination params', async () => {
      const spy = jest.spyOn(service, 'getProducts').mockResolvedValue(result);
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
