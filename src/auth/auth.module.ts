import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './constants';
import { DeviceModule } from 'src/device/device.module';

@Module({
    imports: [
        
        PassportModule,
        UsersModule,
        DeviceModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '600s'},
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        
    ],
    controllers: [AuthController],
})
export class AuthModule { }