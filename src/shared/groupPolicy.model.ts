import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import { Policy } from "../policymanagement/policy.model";
import { Group } from "../groupmanagement/group.model";

@Table({
  freezeTableName: true,
  modelName: "group_policy",
  deletedAt: false,
})
export class GroupPolicy extends Model {
  @ForeignKey(() => Policy)
  @Column({
    type: DataType.UUID,
    field: "policyId",
    primaryKey: true,
  })
  policyId: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.UUID,
    field: "groupId",
    primaryKey: true,
  })
  groupId: string;
}
