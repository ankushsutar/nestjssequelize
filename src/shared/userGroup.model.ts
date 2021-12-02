import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import { Users } from "../users/users.model";
import { Group } from "../groupmanagement/group.model";

@Table({
  freezeTableName: true,
  modelName: "user_group",
  deletedAt: false,
})
export class UserGroup extends Model {
  @ForeignKey(() => Group)
  @Column({
    type: DataType.UUID,
    field: "groupId",
    primaryKey: true,
  })
  groupId: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    field: "id",
    primaryKey: true,
  })
  id: string;
}
