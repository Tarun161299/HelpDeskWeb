import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { AppServiceRequestService } from 'src/app/shared/common/service/app-service-request.service';
import { AppTicketService } from 'src/app/shared/common/service/app-ticket.service';

@Component({
  selector: 'app-board-admin-dashboard',
  templateUrl: './board-admin-dashboard.component.html',
  styleUrls: ['./board-admin-dashboard.component.css']
})
export class BoardAdminDashboardComponent implements OnInit {
  queryParam:any;
  serviceReqId:any;
  ticketRowdata:any;
  ticketdata:any;
  ServicedashBoard:boolean=true;
  TicketSummarydashBoard:boolean=true;
  StatusCount:any;
  rowdata:any;
    constructor(private loader:AfterLoginComponent ,private appservice:AppServiceRequestService,private route:Router,private appTicketService:AppTicketService,private serviceRequestUser:AppServiceRequestService,private datePipe: DatePipe){
  
    }
  
  
  ngOnInit(): void{
    
    this.loader.isLoading = false;
  //   if(localStorage.getItem('Role')==(32).toString()){
  // this.ServicedashBoard=false;
  // this.TicketSummarydashBoard=false;
  // this.GetTicketDataforDeveloper();
  //   }
  //   else{ 
    if(localStorage.getItem('Role')=="Board"){
      this.ServicedashBoard=true;
      this.TicketSummarydashBoard=true;
   
     // this.getServiceData();
      this.GetStatusCount(EncyptionDecryption.Decrypt(localStorage.getItem('userID')),localStorage.getItem('Role'))
      this.loader.isLoading = false;
    }
    if(localStorage.getItem('Role')=="BoardUser"){
      this.ServicedashBoard=true;
      this.TicketSummarydashBoard=true;
   
     // this.getServiceData();
      this.GetStatusCount(EncyptionDecryption.Decrypt(localStorage.getItem('userID')),localStorage.getItem('Role'))
      this.loader.isLoading = false;
    }
    if(localStorage.getItem('Role')=="Developer"){
      
      this.ServicedashBoard=false;
      this.TicketSummarydashBoard=false;
     // this.GetTicketDataforDeveloper();
      this.GetStatusCount(EncyptionDecryption.Decrypt(localStorage.getItem('userID')),localStorage.getItem('Role'))
      this.loader.isLoading = false;
    }
       
      //}
    
  
     
    };
    getServiceData(){
      this.appservice.getByUserId(localStorage.getItem('userID')).subscribe((data:any)=>{
          this.rowdata=data;
      })
      localStorage.setItem('ServiceList',JSON.stringify(this.rowdata))
    }
    GetTicketDataforDeveloper(){
      const userId=EncyptionDecryption.Decrypt(localStorage.getItem('userID'));
      
      this.appTicketService.getAll(userId).subscribe((data:any)=>{
        this.ticketRowdata=data.filter(x=>x.assignStatus=="TA" && x.assignTo==userId);
      })
    }
  GetStatusCount(UserId: string, mode: string) {
    var data = {
      userId: UserId,
      mode: mode
    }
    this.serviceRequestUser.GetDashboardCount(data).subscribe((data: any) => {

      this.StatusCount = data;


    })

  }

      
    // GetTicketdata(){
    //   this.appTicketService.getAll().subscribe((data:any)=>{
    //     this.ticketRowdata=data;
    //   })
    // }
      
  
  onbtnClick() {
    let number = this.getRandomNumber();
    this.serviceReqId = "generateService";
    this.queryParam = EncyptionDecryption.Encrypt(this.serviceReqId + number);
    this.route.navigate(['/generateservicerequest' + '/' + this.queryParam]);
  }
  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }
}
