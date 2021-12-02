import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { PolicymanagementService } from './policymanagement.service';
import { PolicyDto } from './dto/policy';
import { Policy } from './policy.model';
import { GetPolicyDto } from './dto/policy';



@Controller('policymanagement')
export class PolicymanagementController {

    constructor(private policyManagementService: PolicymanagementService) {}

    @Post()
    CreatePolicy(@Body() policy: PolicyDto): Promise<Policy> {
      return this.policyManagementService.create(policy);
    }

   
    @Get()
    GetAllPolicy(@Query() query: GetPolicyDto): Promise<Policy[]> {
    return this.policyManagementService.findAll(query);
  }
}
