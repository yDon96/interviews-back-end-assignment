import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('Products Endpoints', () => {
    it('/products (GET)', () => {
      return request(app.getHttpServer()).get('/products').expect(200);
    });

    it('/products (GET) with wrong value for page params, should give BadRequest', () => {
      return request(app.getHttpServer())
        .get('/products')
        .query({
          page: -1,
        })
        .expect(400);
    });

    it('/products (GET) with wrong value for size params, should give BadRequest', () => {
      return request(app.getHttpServer())
        .get('/products')
        .query({
          size: 102,
        })
        .expect(400);
    });

    it('/products (GET) with wrong value for page and size params, should give BadRequest', () => {
      return request(app.getHttpServer())
        .get('/products')
        .query({
          page: -1,
          size: 102,
        })
        .expect(400);
    });

    it('/products (GET) with correct value for page and size params, should return 200 status code', () => {
      return request(app.getHttpServer())
        .get('/products')
        .query({
          page: 1,
          size: 10,
        })
        .expect(200);
    });
  });
});
