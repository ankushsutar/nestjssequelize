
export class PolicyDto {
  
  policyName: string;

  
  pDescription: string;

  
  accessRightId: string[];
}



export class GetPolicyDto {
  
  offset: number;

  
  limit: number;

  
  search: string;
}
