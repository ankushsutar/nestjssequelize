import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from "sequelize-typescript";
import { Policy } from "../policymanagement/policy.model";
import { RolePolicy } from "../shared/rolePolicy.model";

@Table({
  freezeTableName: true,
  modelName: "access_right",
  deletedAt: false,
})
export class AccessRight extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  accessRightId: string;

  @Column({
    type: "varchar",
    allowNull: false,
  })
  accessRightName: string;

  @BelongsToMany(() => Policy, () => RolePolicy)
  policies: Policy[];
}
