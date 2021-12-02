import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { ModelList } from './shared.model-list';


@Module({
  imports:[SequelizeModule.forFeature(ModelList)],
  controllers: [],
  providers: [],

  
})
export class SharedModule {}

