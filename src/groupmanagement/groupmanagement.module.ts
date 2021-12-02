import { Module } from '@nestjs/common';
import { GroupmanagementController } from './groupmanagement.controller';
import { GroupmanagementService } from './groupmanagement.service';
import {Group} from './group.model';
import { SharedModule } from 'src/shared/shared.module';
import { ModelList } from 'src/shared/shared.model-list';
import { SequelizeModule } from '@nestjs/sequelize';
import { Policy } from 'src/policymanagement/policy.model';
import { UserGroup } from 'src/shared/userGroup.model';
import { UserPolicy } from 'src/shared/userPolicy.model';

@Module({

  imports:[SequelizeModule.forFeature([Group,Policy,UserGroup,UserPolicy]),
  SharedModule,
  SequelizeModule.forFeature(ModelList)],
  controllers: [GroupmanagementController],
  providers: [GroupmanagementService]
})
export class GroupmanagementModule {}
