import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from "sequelize-typescript";
import { Users } from "../users/users.model";
import {Group} from "../groupmanagement/group.model";
import { AccessRight } from "../shared/roles.model";
import { GroupPolicy } from "../shared/groupPolicy.model";
import { RolePolicy } from "../shared/rolePolicy.model";
import { UserPolicy } from "../shared/userPolicy.model";

@Table({
  freezeTableName: true,
  modelName: "policy",
  deletedAt: false,
})
export class Policy extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  policyId: string;

  @Column({
    type: "varchar",
    allowNull: false,
  })
  policyName: string;

  @Column({
    type: "varchar",
    allowNull: false,
  })
  pDescription: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @BelongsToMany(() => Users, () => UserPolicy)
  users: Users[];

  @BelongsToMany(() => AccessRight, () => RolePolicy)
  accessRights: AccessRight[];

  @BelongsToMany(() => Group, () => GroupPolicy)
  groupId: Group[];
}
