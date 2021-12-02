import {
  AllowNull,
  CreatedAt,
  UpdatedAt,
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo
  } from 'sequelize-typescript';
import { Users } from 'src/users/users.model';
  
  @Table({
    freezeTableName: true,
    modelName: 'device',
    deletedAt: false,
  })
  export class Device extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true
    })
    id: number;
  
    @AllowNull(false)
    @Column
    name: string;
  
    @AllowNull(false)
    @Column
    type: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.TEXT
    })
    description: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.DECIMAL
    })
    version: number;
  
    @AllowNull(false)
    @Column
    tempSenseUUID: number;
  
    @AllowNull(false)
    @Column
    masterDeviceUUID: number;
  
    @AllowNull(false)
    @Column
    masterDeviceType: string;
    
    
    @Column
    createdBy: string;

   
    @Column
    updatedBy: string;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;

  @ForeignKey(() => Users)
  @Column({
      type: DataType.INTEGER,
      allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Users)
  user: Users;
}



  
  