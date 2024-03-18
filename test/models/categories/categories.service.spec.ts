import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../../../src/models/categories/categories.service';
import { getModelToken } from '@nestjs/mongoose';
import { CategoryMockModel } from '../../__mock__/categoryMock.model';

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
