import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Device } from './device.model';


@Module({
  imports:[SequelizeModule.forFeature([Device])],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
