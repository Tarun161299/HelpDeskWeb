
export interface AppServiceRequest 
{
    boardId: string;
    subject: string;
    description: string;
    serviceRequestId: Number;
    serviceRequestNo: string;
    requestCategoryIds:Number;
    status: string;
    priority: string;
    resolutionDate: string;
    userId: string;
    createdDate:string;
    createdBy: string;
    createdIp: string;
    modifiedDate: string;
    modifiedBy: string;
    modifiedIp: string;
    fileName: string;
    fileExtension: string;
    content: string;
}
