import { Module } from '@nestjs/common';
import { TripmanagementController } from './tripmanagement.controller';
import { TripmanagementService } from './tripmanagement.service';

@Module({
  controllers: [TripmanagementController],
  providers: [TripmanagementService]
})
export class TripmanagementModule {}
