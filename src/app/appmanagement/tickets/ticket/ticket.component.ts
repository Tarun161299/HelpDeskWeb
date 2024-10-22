import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { MdStatusService } from 'src/app/shared/common/service/Md_Status.service';
import { AppServiceRequestService } from 'src/app/shared/common/service/app-service-request.service';
import { AppTicketService } from 'src/app/shared/common/service/app-ticket.service';
import { CommonFunctionServices } from 'src/app/shared/common/service/common-function-service.service';
import { ZmstProjectsService } from 'src/app/shared/common/service/zmstProjects.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  ticketdata: any=[];
  ticketdataHid: any;
  Boardsdata: any
  ticketdatafinal: any;
  statusData: any
  AssignedStatusData: any;
  flag: number = 0;
  flag1: number = 0;
  flag2: number = 0;
  ticketdatatemp: any;
  ticketdatakey: string = "ticketdata";
  ticketfilter: FormGroup;
  boardValue: number = 0;
  progressStatusValue: number = 0;
  changeStatusValue: number = 0;
  board: number = 0;
  progressStatus: number = 0;
  Assign: number = 0;
  font: string;
  constructor(private commonFunctionServices: CommonFunctionServices, private loader: AfterLoginComponent, private formBuilder: FormBuilder, private routes: ActivatedRoute, private status: MdStatusService, private Zmstuser: ZmstProjectsService, private route: Router, private appTicketService: AppTicketService, private serviceRequestUser: AppServiceRequestService) {
    this.ticketfilter = this.formBuilder.group({
      boardDropdown: [
        0
      ],
      progressStatus: [0],
      AssignStatus: [0],

    })
  }
  ngOnInit(): void {
    this.loader.isLoading = true;
    this.ticketdataHid = this.ticketdata;

    this.getBoardByUserId()
    const data = {
      userId: EncyptionDecryption.Decrypt(localStorage.getItem('userID')),
      status: this.routes.snapshot.params['status'].toString()
    }
    if (localStorage.getItem('Role') == "ProjectManager") {
      this.GetTicketData(data);
    } if (localStorage.getItem('Role') == "Developer") {
      this.GetTicketDataForDeveloper(data);
    }
  };

  showticketDetail(data: any) {
    this.route.navigate(['/ticketdetails' + '/' + data.ticketId])
  }

  getBoardByUserId() {
    const UserId = localStorage.getItem('userID')
    this.Zmstuser.getByUserId(UserId).subscribe((data: any) => {
      this.Boardsdata = data;
      this.GetProgressStatus();
    })
  }

  GetProgressStatus() {
    this.status.getAll().subscribe((data: any) => {
      this.statusData = data.filter(x => x.entityType == "TP");
      this.GetAssignStatus();
    })
  }

  GetAssignStatus() {
    this.status.getAll().subscribe((data: any) => {
      this.AssignedStatusData = data.filter(x => x.entityType == "TA");
    })
    this.loader.isLoading = false;
  }

  OnchangeBoard(event: any) {
    this.loader.isLoading = true;
    this.filterByAll();
  }

  OnchangeProgressStatus(event: any) {
    this.loader.isLoading = true;
    this.filterByAll()
  }

  OnchangeAssignStatus(event: any) {
    this.loader.isLoading = true;
    this.filterByAll()
  }

  GetTicketData(data: any) {
    this.appTicketService.getAll(data).subscribe((data: any) => {
      const tempData = data.map((eData: any) => {

        return {
          ...eData,
          priorityTest: (eData.priority == "10" ? "fa fa-star text-danger" : eData.priority == "20" ? "fa fa-star text-warning" : "fa fa-star text-primary")
        };
      });
      this.ticketdata = tempData
      this.ticketdatatemp = tempData;
      this.commonFunctionServices.bindDataTable("ticket", 0);
      this.loaderTimeOut();
    })
  }

  onselect(id: any, SelectOrUnselect: any) {
    if (SelectOrUnselect == "taskAssigned") {
    }
  }

  GetTicketDataForDeveloper(dataUserStatus: any) {
    this.appTicketService.getAll(dataUserStatus).subscribe((data: any) => {
      //this.ticketdata = 
      const tempData = data.filter(x => x.assignStatus == "TA" && x.assignTo == dataUserStatus.userId).map((eData: any) => {

        return {
          ...eData,
          priorityTest: (eData.priority == "10" ? "fa fa-star text-danger" : eData.priority == "20" ? "fa fa-star text-warning" : "fa fa-star text-primary")
        };
      });
      this.ticketdata = tempData
      this.ticketdatatemp = tempData;
      this.commonFunctionServices.bindDataTable("ticket", 0);
     // this.loaderTimeOut();
     this.loaderTimeOut();
    })
      //this.commonFunctionServices.bindDataTable("ticket", 0);
      

    
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 400);
  }

  filterByAll() {
    
    this.board = this.ticketfilter.get("boardDropdown").value;
    this.progressStatus = this.ticketfilter.get("progressStatus").value;
    this.Assign = this.ticketfilter.get("AssignStatus").value;

    this.ticketdata = this.ticketdatatemp.filter(x =>
      x.boardId == (this.board == 0 ? x.boardId : this.board) &&
      x.taskStatus == (this.progressStatus == 0 ? x.taskStatus : this.progressStatus) &&
      x.assignStatus == (this.Assign == 0 ? x.assignStatus : this.Assign));

    this.commonFunctionServices.bindDataTable("ticket", 0);
    this.loaderTimeOut();
    this.loader.isLoading = false;
  }
}