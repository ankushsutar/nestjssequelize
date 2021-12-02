//import { Exclude } from "class-transformer";
import { Column, Model, Table, DataType} from "sequelize-typescript";

@Table({
    freezeTableName: true,
    modelName: "users",
    
  })
export class Users extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
    

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    //@Exclude()
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

}