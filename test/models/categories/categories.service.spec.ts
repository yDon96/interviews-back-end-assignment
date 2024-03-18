import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../../../src/models/categories/categories.service';
import { getModelToken } from '@nestjs/mongoose';
import { CategoryMockModel } from '../../__mock__/categoryMock.model';
import { faker } from '@faker-js/faker';
import { IProduct } from '../../../src/models/products/interfaces/products.interfaces';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let model: CategoryMockModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken('categories'),
          useClass: CategoryMockModel,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    model = module.get(getModelToken('categories'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });
  describe('getAllCategories', () => {
    it('should call find to get all categories', async () => {
      const spy = jest.spyOn(model, 'find');
      await service.findAllCategories();

      expect(spy).toBeCalled();
    });

    it('should return data found', async () => {
      const expectedResult = [model.getEntityStub()];
      const result = await service.findAllCategories();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getProductsByCategory Id', () => {
    let id: string;
    beforeEach(() => {
      id = faker.database.mongodbObjectId();
    });
    it('should call find to get all products by Category ID', async () => {
      const spy = jest.spyOn(model, 'findProductsBy');
      await service.findProductsBy(id);

      expect(spy).toBeCalledWith(id);
    });

    it('should return data found', async () => {
      const expectedResult: IProduct[] = [
        {
          _id: faker.string.sample(),
          name: faker.string.sample(),
          image: faker.string.sample(),
          price: faker.number.float(),
          availableQuantity: faker.number.int(),
          category: faker.string.sample(),
        },
      ];
      const spy = jest
        .spyOn(model, 'findProductsBy')
        .mockResolvedValue(expectedResult);
      const result = await service.findProductsBy(id);
      expect(spy).toBeCalledWith(id);
      expect(result).toEqual(expectedResult);
    });

    it('should should return BadRequest if id is incorrect', async () => {
      const spy = jest.spyOn(model, 'findProductsBy');
      id = faker.string.uuid();
      try {
        await service.findProductsBy(id);
      } catch (e) {
        expect(e.message).toBe('Invalid Category ID');
      }

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
