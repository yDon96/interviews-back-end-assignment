import { Module } from '@nestjs/common';
import { ProductsModule } from './models/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './models/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    CategoriesModule,
  ],
})
export class AppModule {}
