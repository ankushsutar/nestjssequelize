import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
  } from "sequelize-typescript";
  import { Users } from "../users/users.model";
  import { Policy } from "../policymanagement/policy.model";
  import { GroupPolicy } from "../shared/groupPolicy.model";
  import { UserGroup } from "../shared/userGroup.model";
  
  @Table({
    freezeTableName: true,
    modelName: "groups",
    deletedAt: false,
  })
  export class Group extends Model {
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    })
    groupId: string;
  
    @Column({
      type: "varchar",
      allowNull: false,
    })
    groupName: string;
  
    @Column({
      type: "varchar",
      allowNull: false,
    })
    groupDesc: string;
  
    @Column({ defaultValue: true })
    isActive: boolean;
  
    @BelongsToMany(() => Policy, () => GroupPolicy)
    policies: Policy[];
  
    @BelongsToMany(() => Users, () => UserGroup)
    users: Users[];
  }
  