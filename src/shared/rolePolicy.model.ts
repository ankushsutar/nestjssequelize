import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import { AccessRight } from "../shared/roles.model";
import { Policy } from "../policymanagement/policy.model";

@Table({
  freezeTableName: true,
  modelName: "roles_policy",
  deletedAt: false,
})
export class RolePolicy extends Model {
  @ForeignKey(() => Policy)
  @Column({
    type: DataType.UUID,
    field: "policyId",
    primaryKey: true,
  })
  policyId: string;

  @ForeignKey(() => AccessRight)
  @Column({
    type: DataType.UUID,
    field: "accessRightId",
    primaryKey: true,
  })
  accessRightId: string;
}
