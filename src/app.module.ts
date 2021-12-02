import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';
import { GroupmanagementModule } from './groupmanagement/groupmanagement.module';
import { PolicymanagementModule } from './policymanagement/policymanagement.module';
import { SharedModule } from './shared/shared.module';
import { ModelList } from './shared/shared.model-list';
import { TripmanagementModule } from './tripmanagement/tripmanagement.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';





@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'Password@123',
    database: 'cwd_server',
    autoLoadModels: true,
    synchronize: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    SharedModule,
    SequelizeModule.forFeature(ModelList),
    UsersModule, AuthModule, DeviceModule, GroupmanagementModule, PolicymanagementModule, TripmanagementModule],
    controllers: [AppController,],
    providers: [AppService],
})
export class AppModule {}
