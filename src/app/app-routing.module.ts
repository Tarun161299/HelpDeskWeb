import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './account/signin/signin.component';
import { SignupComponent } from './account/signup/signup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { DashboardComponent } from './appmanagement/dashboard/dashboard.component';
import { GenerateTicketComponent } from './appmanagement/tickets/generate-ticket/generate-ticket.component';
import { AssignTicketComponent } from './appmanagement/tickets/assign-ticket/assign-ticket.component';
import { TicketComponent } from './appmanagement/tickets/ticket/ticket.component';
import { GenerateServiceRequestComponent } from './appmanagement/servicerequest/generate-service-request/generate-service-request.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupSuccessComponent } from './account/signup/signup-success/signup-success.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { BeforeLoginComponent } from './before-login/before-login.component';
import { MyProfileComponent } from './appmanagement/my-profile/my-profile.component';
import { ChangePasswordComponent } from './appmanagement/change-password/change-password.component';
import { ServiceRequestdetailsComponent } from './appmanagement/servicerequest/service-requestdetails/service-requestdetails.component';
import { LoginMobileOTPComponent } from './account/login-mobile-otp/login-mobile-otp.component';
import { AuthUserComponent } from './appmanagement/auth-user/auth-user.component';
import { BoardAdminDashboardComponent } from './appmanagement/board-admin-dashboard/board-admin-dashboard.component';
import { TicketDetailsComponent } from './appmanagement/tickets/ticket-details/ticket-details.component';
import { CommentsComponent } from './appmanagement/servicerequest/comments/comments.component';
import { ServiceRequestListComponent } from './appmanagement/servicerequest/service-request-list/service-request-list.component';
import { SystemAdministratorDashboardComponent } from './appmanagement/system-administrator-dashboard/system-administrator-dashboard.component';
import { ESSOResponseComponent } from './account/esso-response/esso-response.component';
import { IsLoggedIn } from './shared/common/AuthGuard/is-logged-in.service';

const routes: Routes = [
  {
    path: '', component: BeforeLoginComponent,canActivate: [IsLoggedIn], 
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full', },// , canActivate: [IsLoggedIn]
      { path: 'signin', component: SigninComponent },//, canActivate: [IsLoggedIn]  
      { path: 'signup', component: SignupComponent },
      { path: 'signupsuccess', component: SignupSuccessComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },      
      { path: 'authotp', component: LoginMobileOTPComponent },     
      { path: 'essoresponse/:id', component: ESSOResponseComponent },
        
       
    ],
  },
  {
    path: '', component: AfterLoginComponent, children: [
      { path: 'myprofile', component: MyProfileComponent },
      { path: 'changepassword', component: ChangePasswordComponent },      
      { path: 'dashboard', component: DashboardComponent },
      { path: 'authuser', component: AuthUserComponent },
      { path: 'boardadmindashboard', component: BoardAdminDashboardComponent },
      { path: 'sysadmindashboard', component: SystemAdministratorDashboardComponent },
      { path: 'ticket/:status', component: TicketComponent },
      { path: 'ticketdetails/:ticketId', component: TicketDetailsComponent },
      { path: 'generateticket/:page/:ticketId', component: GenerateTicketComponent },
      { path: 'assignticket', component: AssignTicketComponent },
      { path: 'generateservicerequest/:serviceRequestId', component: GenerateServiceRequestComponent },      
      { path: 'servicerequestlist/:status', component: ServiceRequestListComponent },      
      { path: 'servicerequestdetails/:serviceRequestId', component: ServiceRequestdetailsComponent },
      { path: 'comments', component: CommentsComponent },   
    ],
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
