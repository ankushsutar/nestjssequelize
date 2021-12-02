import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Policy } from './policy.model';
import { AccessRight } from 'src/shared/roles.model';
import { RolePolicy } from 'src/shared/rolePolicy.model';
import { InjectModel } from '@nestjs/sequelize';
import { PolicyDto } from './dto/policy';
import { PolicyRolesDto } from './dto/policy.roles';
import { Op } from 'sequelize';




@Injectable()
export class PolicymanagementService {
    constructor(
        @InjectModel(Policy) private policies: typeof Policy,
        @InjectModel(AccessRight) private roles: typeof AccessRight,
        @InjectModel(RolePolicy) private rolePolicy: typeof RolePolicy
    ) {}
      
      
      
      
      
    async create(policy: PolicyDto): Promise<Policy> {
        var newPolicy = await this.policies.create({ ...policy });
    
        var rolePolicy = new PolicyRolesDto();
        rolePolicy.policyId = newPolicy.policyId;
        rolePolicy.accessRightId = policy.accessRightId;
    
        await this.addRoles(rolePolicy);
    
        return newPolicy;
    }


    async findAll(query): Promise<Policy[]> {
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
          object.where["policyName"] = {
            [Op.iLike]: `%${query.search}%`,
          };
        }
    
        return await this.policies.findAll<Policy>(object);
    }


    


    async addRoles(rolepPolicy: PolicyRolesDto) {
        try {
          var policyRights = await this.rolePolicy.findAll({
            where: { policyId: rolepPolicy.policyId },
          });
          var toBeAddedRoles = rolepPolicy.accessRightId?.filter((a) =>
            policyRights.every((b) => b.accessRightId != a)
          );
          var toBeDeletedRoles = policyRights?.filter((a) =>
            rolepPolicy.accessRightId.every((b) => b != a.accessRightId)
          );
    
          for (let index = 0; index < toBeAddedRoles.length; index++) {
            this.rolePolicy.create({
              policyId: rolepPolicy.policyId,
              accessRightId: toBeAddedRoles[index],
            });
          }
    
          for (let index = 0; index < toBeDeletedRoles.length; index++) {
            this.rolePolicy.destroy({
              where: {
                accessRightId: toBeDeletedRoles[index].accessRightId,
              },
            });
          }
          // for (const roles of rolepPolicy.accessRightId) {
          //   this.roles.findByPk(roles).then((role) => {
          //     this.rolePolicy.create({
          //       accessRightId: role.accessRightId,
          //       policyId: rolepPolicy.policyId,
          //     });
          //   });
          // }
        } catch (error) {
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}
