
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Users } from "./users.model";
import { Delete } from "@nestjs/common";
import { usersDto } from "./users.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService:UsersService){}

    @Get()
    async fetchAll(@Res() response) {
        const users = await this.usersService.findAll();
        return response.status(HttpStatus.OK).json({
            users
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createUser(@Res() response, @Body() user: usersDto) {
        const newuser = await this.usersService.createUser(user);
        return response.status(HttpStatus.CREATED).json({
            newuser
        })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const user = await this.usersService.findOne(id);
        return response.status(HttpStatus.OK).json({
            user
        })
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const user = await this.usersService.delete(id);
        return response.status(HttpStatus.OK).json({
            user
        })
    }
    



}
