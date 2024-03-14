import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../../src/models/products/products.controller';
import { ProductsService } from '../../../src/models/products/products.service';
import { IProducts } from '../../../src/models/products/interfaces/products.interfaces';

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
      const result: IProducts[] = [
        {
          name: 'string',
          image: 'string',
          price: 0,
          availableQuantity: 0,
          category: 'string',
        },
      ];
      jest.spyOn(service, 'getProducts').mockImplementation(() => result);

      expect(await controller.getAllProducts()).toBe(result);
    });
  });
});
