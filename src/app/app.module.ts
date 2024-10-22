import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './account/signin/signin.component';
import { SignupComponent } from './account/signup/signup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { DashboardComponent } from './appmanagement/dashboard/dashboard.component';
import { TicketComponent } from './appmanagement/tickets/ticket/ticket.component';
import { GenerateTicketComponent } from './appmanagement/tickets/generate-ticket/generate-ticket.component';
import { AssignTicketComponent } from './appmanagement/tickets/assign-ticket/assign-ticket.component';
import { TicketListComponent } from './appmanagement/tickets/ticket-list/ticket-list.component';
import { SignupSuccessComponent } from './account/signup/signup-success/signup-success.component';
import { GenerateServiceRequestComponent } from './appmanagement/servicerequest/generate-service-request/generate-service-request.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { BeforeLoginComponent } from './before-login/before-login.component';
import { HeaderComponent } from './public/header/header.component';
import { FooterComponent } from './public/footer/footer.component';
import { HeaderAlComponent } from './public/header-al/header-al.component';
import { FooterAlComponent } from './public/footer-al/footer-al.component';
import { ChangePasswordComponent } from './appmanagement/change-password/change-password.component';
import { MyProfileComponent } from './appmanagement/my-profile/my-profile.component';
import { SideNavbarComponent } from './public/side-navbar/side-navbar.component';
import { ServiceRequestdetailsComponent } from './appmanagement/servicerequest/service-requestdetails/service-requestdetails.component';
//import { LoginMobileOTPComponent } from './account/login-mobile-otp/login-mobile-otp.component';
import { AuthUserComponent } from './appmanagement/auth-user/auth-user.component';
import { BoardAdminDashboardComponent } from './appmanagement/board-admin-dashboard/board-admin-dashboard.component';
import { TicketDetailsComponent } from './appmanagement/tickets/ticket-details/ticket-details.component';
import { CommentsComponent } from './appmanagement/servicerequest/comments/comments.component';
import { ServiceRequestListComponent } from './appmanagement/servicerequest/service-request-list/service-request-list.component';
import { SystemAdministratorDashboardComponent } from './appmanagement/system-administrator-dashboard/system-administrator-dashboard.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NgxCaptchaModule } from 'ngx-captcha';
//import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//import { ConfirmationDialogComponent } from './shared/common/service/ConfimationPopupService/confirmation-dialog/confirmation-dialog.component';
//import { ConfirmationDialogService } from './shared/common/service/ConfimationPopupService/confirmation-dialog.service';

import { DateFormat } from './shared/pipe/datefromat-pipe';
import { ConfirmationDialogService } from './shared/common/service/ConfimationPopupService/confirmation-dialog.service';
import { ConfirmationDialogComponent } from './shared/common/service/ConfimationPopupService/confirmation-dialog/confirmation-dialog.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { EncyptionDecryption } from './shared/common/service/EncyptionDecryption.service';
import { LoginMobileOTPComponent } from './account/login-mobile-otp/login-mobile-otp.component';
import { LoaderSpinnerComponent } from './shared/common/loader/loader-spinner/loader-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './shared/common/loader/optional-Loader/optionalLoader';
import { ESSOResponseComponent } from './account/esso-response/esso-response.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LocalStorageService } from './shared/common/service/local-storage.service';
import { LocalTimePipe } from './shared/pipe/timeformat-pipe';
import { CommaSeperatedPipe } from './shared/pipe/commaSeperated-pipe';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTablesModule } from 'angular-datatables';
import { HeaderInterceptor } from './shared/common/HeaderInterceptor';
import { JwtTokenService } from './shared/common/service/jwtTokenService';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    TicketComponent,
    GenerateTicketComponent,
    AssignTicketComponent,
    TicketListComponent,
    SignupSuccessComponent,
    GenerateServiceRequestComponent,    
    PagenotfoundComponent,    
    AfterLoginComponent,
    BeforeLoginComponent,
    HeaderComponent,
    FooterComponent,
    HeaderAlComponent,
    FooterAlComponent,
    ChangePasswordComponent,
    MyProfileComponent,
    SideNavbarComponent,
    ServiceRequestdetailsComponent,
    LoginMobileOTPComponent,
    AuthUserComponent,
    BoardAdminDashboardComponent,
    TicketDetailsComponent,
    CommentsComponent,
    ServiceRequestListComponent,
    SystemAdministratorDashboardComponent,
    ConfirmationDialogComponent,
    DateFormat,
    LocalTimePipe,
    CommaSeperatedPipe,
    LoaderSpinnerComponent,
    ESSOResponseComponent,
    
    
  ],
  imports: [
    FormsModule,    
    CommonModule ,
    BrowserModule,
    AppRoutingModule,
    FormsModule,   
    ReactiveFormsModule ,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000, // 5 seconds
      closeButton: true,
      progressBar: true,
    }),
    NgMultiSelectDropDownModule.forRoot(),
    DataTablesModule    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    ConfirmationDialogService,
    DatePipe,
    EncyptionDecryption,
    LocalStorageService,
  
  ],
 // providers: [DatePipe,],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
