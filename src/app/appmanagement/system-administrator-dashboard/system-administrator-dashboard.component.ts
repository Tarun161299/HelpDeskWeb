import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { AppServiceRequestService } from 'src/app/shared/common/service/app-service-request.service';
import { AppTicketService } from 'src/app/shared/common/service/app-ticket.service';


@Component({
  selector: 'app-system-administrator-dashboard',
  templateUrl: './system-administrator-dashboard.component.html',
  styleUrls: ['./system-administrator-dashboard.component.css']
})
export class SystemAdministratorDashboardComponent {
  ticketRowdata: any;
  ticketdata: any;
  ServicedashBoard: boolean = true;
  TicketSummarydashBoard: boolean = true;
  StatusCount: any;
  http: any;
  constructor(private loader: AfterLoginComponent, private route: Router, private appTicketService: AppTicketService, private serviceRequestUser: AppServiceRequestService) {

  }

  ngOnInit(): void {
    this.loader.isLoading = false;
    //   if(localStorage.getItem('Role')==(32).toString()){
    // this.ServicedashBoard=false;
    // this.TicketSummarydashBoard=false;
    // this.GetTicketDataforDeveloper();
    //   }
    //   else{ 
    if (localStorage.getItem('Role') == "ProjectManager") {
      this.ServicedashBoard = true;
      this.TicketSummarydashBoard = true;
      this.GetTicketData();
      this.GetStatusCount(EncyptionDecryption.Decrypt(localStorage.getItem('userID')), localStorage.getItem('Role'))
    }
    if (localStorage.getItem('Role') == "Developer") {

      this.ServicedashBoard = false;
      this.TicketSummarydashBoard = false;
      this.GetTicketDataforDeveloper();
      this.GetStatusCount(EncyptionDecryption.Decrypt(localStorage.getItem('userID')), localStorage.getItem('Role'))
    }
    
    this.GetStatusCount(EncyptionDecryption.Decrypt(localStorage.getItem('userID')), localStorage.getItem('Role'))
    //}



  };
  GetTicketData() {
    debugger
    const userId = EncyptionDecryption.Decrypt(localStorage.getItem('userID'));
    
    this.appTicketService.getAll(userId).subscribe((data: any) => {
      this.ticketRowdata = data
    })
  }
  GetTicketDataforDeveloper() {
    debugger
    const userId = EncyptionDecryption.Decrypt(localStorage.getItem('userID'));
    this.appTicketService.getAll(userId).subscribe((data: any) => {
      this.ticketRowdata = data.filter(x => x.assignStatus == "TA" && x.assignTo == userId);
    })
  }
   GetStatusCount(UserId: string, mode: string) {
     var data = {
       userId: UserId,
       mode: mode
     }
     this.serviceRequestUser.GetDashboardCount(data).subscribe((response: any) => {
 
 
       this.StatusCount = response;
     })
   }

// GetStatusCount(UserId: string, mode: string) {
//   var data = {
//     userId: UserId,
//     mode: mode
//   }
//   const headers = { "Accept": "text/plain" }
// 
//   this.http.post('http://localhost:5197/api/AppServiceRequest/GetStatusCountAsync',data, { observe: 'response',Headers:headers }).pipe(
//     catchError((error) => {
//       // Handle errors if necessary
//       console.error('Error:', error);
//       return throwError(error);
//     })
//   ).subscribe(response => {
//     // Access the response headers
//     const headers: HttpHeaders = response.headers;

//     // Access specific header values
//     const contentType = headers.get('Content-Type');
//     const customHeader = headers.get('X-Custom-Header');

//     console.log('Content-Type:', contentType);
//     console.log('Custom Header:', customHeader);

//     // Access the response body
//     const data = response.body;
//     console.log('Response Data:', data);
//   });
// }



  
  OnAssignTicket() {

    //this.serviceRequestUser.setItem(this.ticketRowdata);
    this.route.navigate(['/ticket/AL']);
  }
  onAssign() {
    // this.serviceRequestUser.setItem(this.ticketRowdata.filter(x=>x.assignStatus=="TA"));
    this.route.navigate(['/ticket/TA']);
  }
  unAssign() {
    // this.serviceRequestUser.setItem(this.ticketRowdata.filter(x=>x.assignStatus=="TU"));
    this.route.navigate(['/ticket/TU']);
  }
  Inprogress() {
    // this.serviceRequestUser.setItem(this.ticketRowdata.filter(x=>x.assignStatus=="TA" && x.taskStatus=="PI"));
    this.route.navigate(['/ticket/PI']);
  }
  ClarificationRq() {
    //this.serviceRequestUser.setItem(this.ticketRowdata.filter(x=>x.assignStatus=="TA" && x.taskStatus=="PR"));
    this.route.navigate(['/ticket/PR']);
  }
  Help() {
    //this.serviceRequestUser.setItem(this.ticketRowdata.filter(x=>x.assignStatus=="TA" && x.taskStatus=="PN"));
    this.route.navigate(['/ticket/PN']);
  }
  Completed() {
    // this.serviceRequestUser.setItem(this.ticketRowdata.filter(x=>x.assignStatus=="TA" && x.taskStatus=="PA"));
    this.route.navigate(['/ticket/PA']);
  }
  Returned() {
    //this.serviceRequestUser.setItem(this.ticketRowdata.filter(x=>x.assignStatus=="TA" && x.taskStatus=="PT"));
    this.route.navigate(['/ticket/PT']);
  }
  TotalSerice() {
    this.route.navigate(['/servicerequestlist/AL']);
  }
  
}
