import { Get } from '@nestjs/common';
import { Controller, Query,Body } from '@nestjs/common';
import { GroupmanagementService } from './groupmanagement.service';
import { GetgroupDto } from './dto/group.dto';
import { Group } from '../groupmanagement/group.model';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '@nestjs/common';
import { CreateGroupDto } from './dto/group.dto';


@Controller('groupmanagement')
export class GroupmanagementController {

    constructor( 
        private groupmanagementService: GroupmanagementService, 
        @InjectModel(Group) private groupModel: typeof Group
    ){}



    @Get()
    GetAllGroups(@Query() query: GetgroupDto): Promise<Group[]> {
        return this.groupmanagementService.findAll(query);
    }
    


    @Post()
    CreateGroup(@Body() group: CreateGroupDto): Promise<Group> {
        return this.groupmanagementService.create(group);
    }
}
