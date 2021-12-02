import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Group} from './/group.model';
import { Policy } from 'src/policymanagement/policy.model';
import { GroupPolicy } from 'src/shared/groupPolicy.model';
import { UserGroup } from 'src/shared/userGroup.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from "sequelize";
import { CreateGroupDto } from './dto/group.dto';
import { GroupDto } from './dto/group.dto';
import { classToPlain, plainToClass } from "class-transformer";




@Injectable()
export class GroupmanagementService {

    constructor(
        @InjectModel(Group) private groups: typeof Group,
        //@InjectModel(Policy) private policy: typeof Policy,
        @InjectModel(GroupPolicy) private groupPolicy: typeof GroupPolicy,
        @InjectModel(UserGroup) private userGroup: typeof UserGroup
      ) {}



      async findAll(query): Promise<Group[]> {
        const object = {
          where: {
            isActive: true,
          },
          raw: true,
        };
    
        if (query.offset) {
          object["offset"] = query.offset;
        }
        if (query.limit) {
          object["limit"] = query.limit;
        }
        if (query.search) {
          object.where["groupName"] = {
            [Op.iLike]: `%${query.search}%`,
          };
        }
    
        return await this.groups.findAll<Group>(object);
    }





    async create(groupDto: CreateGroupDto): Promise<any> {
        try {
          var modal = GroupmanagementService.toModel(groupDto);
          var groupModel = await this.groups.create({
            groupName: modal.groupName,
            groupDesc: modal.groupDesc,
          });
          for (const policy of modal.policies) {
            await this.groupPolicy.create({
              groupId: groupModel.groupId,
              policyId: policy.policyId,
            });
          }
          for (const group of modal.users) {
            await this.userGroup.create({
              id: group.id,
              groupId: groupModel.groupId,
            });
          }
          groupModel.policies = modal.policies;
          groupModel.users = modal.users;
          return new GroupDto(groupModel);
          //return await this.groups.create<Group>({ ...group });
        } catch (error) {
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    static toModel(groupDto: CreateGroupDto): Group {
        const data = classToPlain(groupDto);
        return plainToClass(Group, data);
    }
    
}
