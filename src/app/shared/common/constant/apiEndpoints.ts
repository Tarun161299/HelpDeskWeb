import { environment } from "src/environments/environment";

export const ApiEndPoints = {
    
    AppTicketByBoard:environment.apiURL+"AppTicket/GetByBoard",
    //#region App_Ticket
    AppTicket_Insert:environment.apiURL+"AppTicket/Insert",
    
    AppTicket_Update:environment.apiURL+"AppTicket/Update", 
    
    AppTicket_Delete:environment.apiURL+"AppTicket/Delete?TicketId=", 
    
    AppTicket_GetAll:environment.apiURL+"AppTicket/GetAllByRole",
    
    AppTicket_GetById:environment.apiURL+"AppTicket/GetById?TicketId=", 
    //#regionend App_Ticket

    //#region Send OTP
    OTPverification:environment.apiURL+'AppServiceRequest/OTP',
    //#regionend Send OTP

    //#region Zmst_Projects
    ZmstProjects_Insert:environment.apiURL+"ZmstProjects/Insert",

    ZmstProjects_Update:environment.apiURL+"ZmstProjects/Update", 

    ZmstProjects_Delete:environment.apiURL+"ZmstProjects/Delete?AgencyId=", 

    ZmstProjects_GetAll:environment.apiURL+"ZmstProjects/GetAll",

    ZmstProjects_GetById:environment.apiURL+"ZmstProjects/GetById?AgencyId=",

    ZmstProjects_GetByUserId:environment.apiURL+"ZmstProjects/GetbyUserId?UserId=", 
    //#regionend Zmst_Projects

    //#region MdSection
    MdSection_GetAll:environment.apiURL+"MdSection/GetAll",
    //#regionend MdSection
    MD_Priority:environment.apiURL+"MDPriority/GetAll",

    MD_Status:environment.apiURL+"MD_Status/GetAll",

    Md_UserBoardRoleMapping:environment.apiURL+"MdUserBoardRoleMapping/GetByBoardId?boardid=",

    Md_UserBoardRoleMapping_byUserId:environment.apiURL+"MdUserBoardRoleMapping/GetById?UserId=",

    AppDocumentUploadedDetail_Insert:environment.apiURL+"AppDocumentUploadedDetail/Insert",

    AppDocumentUploadedDetail_GetByFileId:environment.apiURL+"AppDocumentUploadedDetail/GetById?fileId=",


    //#region AppServiceRequest
    AppServiceRequest_Insert:environment.apiURL+"AppServiceRequest/Insert",

    AppServiceRequest_GetByIdData:environment.apiURL+"AppServiceRequest/GetByIdData",

    //AppServiceRequest_GetByUserId:environment.apiURL+"AppServiceRequest/GetById?UserId=",
    AppServiceRequest_GetByUserId:environment.apiURL+"AppServiceRequest/GetById",

    AppServiceRequest_GetByServiceRequestId:environment.apiURL+"AppServiceRequest/GetByRequestId?serviceRequestId=",
    //#regionend AppServiceRequest 
    AppDocumentUploadedDetail_Update:environment.apiURL+"AppDocumentUploadedDetail/Update",

    AppServiceRequest_Update:environment.apiURL+"AppServiceRequest/Update",
    AppServiceRequest_Delete:environment.apiURL+'AppServiceRequest/Delete?ServiceRequestId=',
    GetDashBoardCount:environment.apiURL+"AppServiceRequest/GetStatusCountAsync",

    //#region AppLoginDetails
    AppLoginDetails_GetByUserId:environment.apiURL+"AppLoginDetails/GetById?UserId=",
    AppLoginDetails_GetByEisId:environment.apiURL+"AppLoginDetails/GetByEisId?eisId=",
    //#regionend AppLoginDetails

    //#region ESSOService
    ESSOService_GetById:environment.apiURL+"ExtEndPoint/GetById?id=",
    ESSOService_Logout:environment.apiURL+"ExtEndPoint/Logout",
    //#regionend ESSOService

    //#region AppRemarks
    AppRemarks_Insert:environment.apiURL+"AppRemarks/Insert",

    AppRemarks_GetByModuleId:environment.apiURL+"AppRemarks/GetByModuleId",   
    
    //#regionend AppRemarks
    //#region Captcha
    ////GetCaptcha:"http://localhost:5197/Captcha/GetCaptchaImage",
    GetCaptcha:environment.apiURL+"Captcha/GetCaptchaImage",
    
    //#regionend Captcha
    Check_Captcha:environment.apiURL+"Captcha/CheckCaptcha?input=",

    //#region IP Address
    GetIP:environment.apiURL+'AppServiceRequest/GetIP',
    //#regionend IP Address
    Authenticate:environment.apiURL+'JwtAuthentication/Authorize',

    RefreshToken:environment.apiURL+'JwtAuthentication/RefreshToken',

    //#AppSetting Data
    AppSettingDateHeaders:environment.apiURL+'AppsettingData/GetHeaders',

    AppSettingResolutionDates:environment.apiURL+'AppsettingData/GetResolutionDate?priority=',

    AppTicketDetailsDelete:environment.apiURL+'AppTicket/Delete?TicketId='
                                     
}