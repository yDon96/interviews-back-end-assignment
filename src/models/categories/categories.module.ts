import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './entities/category.entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'categories', schema: CategorySchema }]),
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
