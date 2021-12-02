import { IsInt } from 'class-validator';

export class DeviceDto {
  
  Devicename: string;

  
  Devicetype: string;

  
  description: string;

  
  
  version: number;

 
  @IsInt()
  tempSenseUUID: number;

  
  @IsInt()
  masterDeviceUUID: number;

  
  masterDeviceType: string;  

 
}