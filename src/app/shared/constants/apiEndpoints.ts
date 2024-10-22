import { environment } from 'src/environments/environment';


export const ApiEndPoints = {
   
serviceRequestInsert:environment.apiURL+'AppServiceRequest/Insert',

serviceRequestGetAll:environment.apiURL+'AppServiceRequest/GetAll',
AppServiceRequest_Insert:environment.apiURL+"AppServiceRequest/Insert",
ServiceRequestStstusCount:environment.apiURL+'AppServiceRequest/GetStatusCountAsync',

// AppServiceRequest_Update:environment.apiURL+"AppServiceRequest/Update", 

// AppServiceRequest_Delete:environment.apiURL+"AppServiceRequest/Delete?ServiceRequestId=", 

AppServiceRequest_GetAll:environment.apiURL+"AppServiceRequest/GetAll",

GetByIdData:environment.apiURL+"AppServiceRequest/GetByIdData",

update:environment.apiURL+"AppServiceRequest/Update",

// AppServiceRequest_GetById:environment.apiURL+"AppServiceRequest/GetById?ServiceRequestId=", 
//#regionend App_ServiceRequest

//#region Zmst_Projects
ZmstProjects_Insert:environment.apiURL+"ZmstProjects/Insert",

ZmstProjects_Update:environment.apiURL+"ZmstProjects/Update", 

ZmstProjects_Delete:environment.apiURL+"ZmstProjects/Delete?AgencyId=", 

ZmstProjects_GetAll:environment.apiURL+"ZmstProjects/GetAll",

ZmstProjects_GetById:environment.apiURL+"ZmstProjects/GetById?AgencyId=", 
//#regionend Zmst_Projects
AppTicketByBoard:environment.apiURL+"AppTicket/GetByBoard",
//#region App_Ticket
AppTicket_Insert:environment.apiURL+"AppTicket/Insert",

AppTicket_Update:environment.apiURL+"AppTicket/Update", 

AppTicket_Delete:environment.apiURL+"AppTicket/Delete?TicketId=", 

AppTicket_GetAll:environment.apiURL+"AppTicket/GetAll",

AppTicket_GetById:environment.apiURL+"AppTicket/GetById?TicketId=", 
//#regionend App_Ticket
//#region MD_UserBoardRoleMapping
MdUserBoardRoleMapping_Insert:environment.apiURL+"MdUserBoardRoleMapping/Insert",

MdUserBoardRoleMapping_Update:environment.apiURL+"MdUserBoardRoleMapping/Update", 

MdUserBoardRoleMapping_Delete:environment.apiURL+"MdUserBoardRoleMapping/Delete?UserId=", 

MdUserBoardRoleMapping_GetAll:environment.apiURL+"MdUserBoardRoleMapping/GetAll",

MdUserBoardRoleMapping_GetById:environment.apiURL+"MdUserBoardRoleMapping/GetById?UserId=", 
//#regionend MD_UserBoardRoleMapping

OTPverification:environment.apiURL+"AppServiceRequest/OTP?OTP=",

checkUserIdAvailibility:environment.apiURL+"AppLoginDetails/CheckUserIDAvailibility?userID=",

SaveSignUpDetail:environment.apiURL+"AppLoginDetails/SaveSignUp",

GetCaptcha:environment.apiURL+"AppLoginDetails/GetCaptcha"
}