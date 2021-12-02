
import { AccessRight } from "src/shared/roles.model";

export class AccessRightDto {
  
  accessRightId: string;
  
  accessRightName: string;

  constructor(accessRight: AccessRight) {
    this.accessRightId = accessRight.accessRightId;
    this.accessRightName = accessRight.accessRightName;
  }
}
