import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Users } from 'src/users/users.model';
import { Device } from './device.model';
import { DeviceDto } from './device.dto';

@Injectable()
export class DeviceService {
    constructor(@InjectModel(Device)
    private DeviceModel: typeof Device
) { }

    async create(device: DeviceDto, userId, createdBy): Promise<Device> {
        return await this.DeviceModel.create<Device>({ ...device, userId,createdBy});
    }

    async findAll(): Promise<Device[]> {
        return await this.DeviceModel.findAll<Device>({
        	include: [{ model: Users, attributes: { exclude: ['password'] } }],
    	});
    }

    async findOne(id): Promise<Device> {
        return await this.DeviceModel.findOne({
        	where: { id },
        	include: [{ model: Users, attributes: { exclude: ['password'] } }],
    	});
    }

    async delete(id, userId) {
        return await this.DeviceModel.destroy({ where: { id, userId } });
    }

    async update(id, data, userId) {
        const [numberOfAffectedRows, [updatedPost]] = await this.DeviceModel.update({ ...data }, { where: { id, userId }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    }
}