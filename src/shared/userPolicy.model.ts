import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import { Policy } from "../policymanagement/policy.model";
import { Users } from "../users/users.model";

@Table({
  freezeTableName: true,
  modelName: "user_policy",
  deletedAt: false,
})
export class UserPolicy extends Model {
  @ForeignKey(() => Policy)
  @Column({
    type: DataType.UUID,
    field: "policyId",
    primaryKey: true,
  })
  policyId: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    field: "id",
    primaryKey: true,
  })
  id: string;
}
