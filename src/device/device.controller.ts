import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Device } from './device.model';
import { DeviceDto } from './device.dto';
import {DeviceService} from './device.service'



@Controller('device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) { }

    @Get()
    async findAll() {
        // get all device in the db
        return await this.deviceService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Device> {
        // find the device with this id
        const device = await this.deviceService.findOne(id);

        // if the device doesn't exit in the db, throw a 404 error
        if (!device) {
            throw new NotFoundException('This Device doesn\'t exist');
        }

        // if device exist, return the device
        return device;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() device: DeviceDto, @Request() req): Promise<Device> {
        // create a new post and return the newly created post
        return await this.deviceService.create(device, req.user.id, req.user.name);
    }

   /* @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() device: DeviceDto, @Request() req): Promise<Device> {
        // get the number of row affected and the updated device
        const { numberOfAffectedRows, updatedDevice } = await this.deviceService.update(id, device, req.user.id);

        // if the number of row affected is zero, 
        // it means the device doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Device doesn\'t exist');
        }

        // return the updated device
        return updatedDevice;
    }*/

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the Device with this id
        const deleted = await this.deviceService.delete(id, req.user.id);

        // if the number of row affected is zero, 
        // then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Device doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}