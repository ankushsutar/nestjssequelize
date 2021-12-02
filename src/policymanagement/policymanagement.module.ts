import { Module } from '@nestjs/common';
import { PolicymanagementController } from './policymanagement.controller';
import { PolicymanagementService } from './policymanagement.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from 'src/shared/shared.module';
import { ModelList } from 'src/shared/shared.model-list';
import { Policy } from './policy.model';
import { AccessRight } from 'src/shared/roles.model';
import { RolePolicy } from 'src/shared/rolePolicy.model';


@Module({
  
  imports:[SequelizeModule.forFeature([Policy,AccessRight,RolePolicy]),
  SharedModule,
  SequelizeModule.forFeature(ModelList)],
  controllers: [PolicymanagementController],
  providers: [PolicymanagementService]
})
export class PolicymanagementModule {}
