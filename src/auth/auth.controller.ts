import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { usersDto } from 'src/users/users.dto';
import { DoesUserExist } from './gurads/doesUserExist.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }


    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: usersDto) {
        return await this.authService.create(user);
    }
}