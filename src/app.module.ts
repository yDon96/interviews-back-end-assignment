import { Module } from '@nestjs/common';
import { ProductsModule } from './models/products/products.module';

@Module({
  imports: [ProductsModule],
})
export class AppModule {}
