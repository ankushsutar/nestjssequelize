
import { Injectable, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { usersDto } from "./users.dto";
import { Users } from "./users.model";


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users)
        private UsersModel: typeof Users

        
    ) {}



    async findAll(): Promise<Users[]> {
        return this.UsersModel.findAll();
    }


    async createUser(user: usersDto): Promise<Users> {
        return this.UsersModel.create(user);
    }

    async findOne(id: string): Promise<Users> {
        return this.UsersModel.findOne({
            where: {
                id,
            },
        });
    }
    
    async delete(id: string): Promise<any> {
        await this.UsersModel.destroy({
            where: {
                id,
            },
            
              
        });
        return {
            statusCode: HttpStatus.OK,
            message: `UserId ${id} Deleted Successfully`,
            
          };
    }

    async findOneByEmail(email: string): Promise<Users> {
        return this.UsersModel.findOne({
            where: { email},
        });
    }


    async findOneById(id: number): Promise<Users> {
        return this.UsersModel.findOne({
            where: {
                id,
            },
        });
    }
}
