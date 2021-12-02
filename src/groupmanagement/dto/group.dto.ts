
import { IsArray, ValidateNested } from "class-validator";
//import { DataType } from "sequelize-typescript";
import { Group } from "../group.model";
import { Exclude, Expose } from "class-transformer";
import { Policy } from "src/policymanagement/policy.model";
import { Users } from "src/users/users.model";

export class CreateGroupDto {
 
  groupName: string;

  
  groupDesc: string;

  
  @IsArray()
  policies: PolicyGroupDto[];

  
  @IsArray()
  users: GroupUserDto[];
}

export class GroupDto {
 
  groupId: string;

  
  groupName: string;
  
  groupDesc: string;

  
  readonly policies: PolicyGroupDto[];

  
  readonly users: GroupUserDto[];

  constructor(group: Group) {
    this.groupId = group.groupId;
    this.groupName = group.groupName;
    this.groupDesc = group.groupDesc;
    this.policies =
      group.policies == undefined
        ? null
        : group.policies.map((policy) => new PolicyGroupDto(policy));
    this.users =
      group.users == undefined
        ? null
        : group.users.map((user) => new GroupUserDto(user));
  }
}

@Exclude()
export class PolicyGroupDto {
  @Expose()
  
  policyId: string;

  constructor(policy: Policy) {
    this.policyId = policy.policyId;
  }
}

export class GroupUserDto {
  
  id: string;

  constructor(user: Users) {
    this.id = user.id;
  }
}
export class GetgroupDto {
  
  offset: number;

  
  limit: number;

  
  search: string;
}

export class BulkGroupDto {
  
  @IsArray()
  @ValidateNested({
    each: true,
  })
  groups: BasicGroupDto[];
}

export class BasicGroupDto {
  
  groupName: string;
  
  groupDesc: string;
}
