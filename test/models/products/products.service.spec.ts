import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../../src/models/products/products.service';
import { getModelToken } from '@nestjs/mongoose';
import { ProductMockModel } from '../../__mock__/productMock.model';
import { Pagination } from '../../../src/common/decorators/paginationParams';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: ProductMockModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken('product'),
          useClass: ProductMockModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get(getModelToken('product'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call countDocument to get collection size', async () => {
    const paginationParams: Pagination = {
      page: 2,
      size: 10,
      limit: 10,
      offset: 10,
    };
    const spy = jest.spyOn(model, 'countDocuments');
    await service.getProducts(paginationParams);

    expect(spy).toBeCalled();
  });

  it('should call find to get documents using the pagination parameter', async () => {
    const paginationParams: Pagination = {
      page: 2,
      size: 10,
      limit: 10,
      offset: 10,
    };
    const spy = jest.spyOn(model, 'getSlice');
    await service.getProducts(paginationParams);

    expect(spy).toBeCalledWith(paginationParams.page, paginationParams.limit);
  });

  it('should return data found and info about it', async () => {
    const paginationParams: Pagination = {
      page: 1,
      size: 10,
      limit: 10,
      offset: 10,
    };
    const expectedResult = {
      data: [
        {
          _id: 'string',
          name: 'string',
          image: 'string',
          price: 0,
          availableQuantity: 0,
          category: 'string',
        },
      ],
      dataInfo: {
        currentOffset: 1,
        dataLength: 1,
        totalElements: 1,
      },
    };
    const result = await service.getProducts(paginationParams);

    expect(result).toEqual(expectedResult);
  });
});
