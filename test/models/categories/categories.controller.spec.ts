import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../../src/models/categories/categories.controller';
import { CategoriesService } from '../../../src/models/categories/categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCategories', () => {
    it('should return an array of categories obtained by service function', async () => {
      const expectedResult = {
        name: 'catExample',
        elementsCount: 10,
      };
      const spy = jest
        .spyOn(service, 'findAllCategories')
        .mockResolvedValue(expectedResult);
      const result = await controller.getAllCategories();
      expect(result).toEqual(expectedResult);
      expect(spy).toBeCalled();
    });
  });
});
