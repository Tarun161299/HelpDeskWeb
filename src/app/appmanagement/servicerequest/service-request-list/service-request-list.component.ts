import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';
import { ZmstProjectsModel } from 'src/app/shared/common/model/zmst-projects.model';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { MdStatusService } from 'src/app/shared/common/service/Md_Status.service';
import { AppServiceRequestService } from 'src/app/shared/common/service/app-service-request.service';
import { CommonFunctionServices } from 'src/app/shared/common/service/common-function-service.service';
import { LocalStorageTokenService } from 'src/app/shared/common/service/local-storage-token-service.service';
import { MdSectionService } from 'src/app/shared/common/service/mdSection.service';
import { ZmstProjectsService } from 'src/app/shared/common/service/zmstProjects.service';

declare const $: any;
@Component({
  selector: 'app-service-request-list',
  templateUrl: './service-request-list.component.html',
  styleUrls: ['./service-request-list.component.css']
})
export class ServiceRequestListComponent implements OnInit {
  rowdata: any=[];
  boardId: any;
  serviceRequestId: any;
  userId: any;
  zmstProjects: ZmstProjectsModel[] = [];
  status: any;
  mdStatus: any;
  queryParam: any;
  tempData: any;
  statusUrl: any;
  mdSection: any;
  tempdata:any;
  filterData: any;
  dtOptions: any;
  
  ngOnInit(): void { 
    this.getsection();
    this.userId = this.localstore.get('userID');
    this.loader.isLoading = true;
    this.ZmstProjectGetAll();
    this.MdStatusGetAll();
    this.statusUrl = this.route.snapshot.params['status'].toString();
    const userIdAndStatus = {
      userId: this.userId,
      status: this.statusUrl.toString()
    }
    this.serviceRequestList(userIdAndStatus);
  }

  ngAfterViewInit(): void {	
		$('#serviceRequestList').DataTable({			
			//dom: 'Bfrtip',			
			buttons: ['copy', 'excel', 'csv' , 'pdf', 'print']			
		});	
		
	}

  constructor(private toastrService: ToastrService,private commonFunctionServices: CommonFunctionServices, private mdSectionService: MdSectionService, private route: ActivatedRoute, private loader: AfterLoginComponent, private router: Router, private datePipe: DatePipe, private mdStatusService: MdStatusService, private appServiceRequest: AppServiceRequestService, private localstore: LocalStorageTokenService, private zmstProjectsService: ZmstProjectsService) {

  }
  getsection() {
    this.mdSectionService.getAll().subscribe((data: any) => {      
      this.mdSection = data;
    });
  }

  serviceRequestList(userIdAndStatus: any) {

    this.appServiceRequest.getByUserId(userIdAndStatus)
      .subscribe({
        
        next: data => {           
          if (data.length > 0) {
            this.tempData = data;
            this.filterData = data;
            if (localStorage.getItem("Role") == "BoardUser") {
              this.rowdata = data.filter(x => x.userId == EncyptionDecryption.Decrypt(localStorage.getItem("userID")));
              this.commonFunctionServices.bindDataTable("serviceRequestList", 0);
              this.loaderTimeOut();
            }
            else {
              
              this.rowdata = data;
              this.tempdata=data;
              this.commonFunctionServices.bindDataTable("serviceRequestList", 0);
              this.loaderTimeOut();
            }

          }
          else{
            this.loaderTimeOut();
            //this.toastrService.error('No Record Found');
          }

        }, error: (err: any) => {
          //this.router.navigate(['/Unauthorize']);
        }
      })
  }
  selectBoard(id: any) {
    this.loader.isLoading = true;
    if (id.target.value == 0) {
      this.rowdata = this.filterData;
      this.commonFunctionServices.bindDataTable("serviceRequestList", 0);
      this.loaderTimeOut();
    }
    else {
      this.rowdata = this.filterData.filter(x => x.boardId == Number(id.target.value))
      this.boardId = id.target.value;
      this.commonFunctionServices.bindDataTable("serviceRequestList", 1);
      this.loaderTimeOut();
    }

  }
  selectStatus(id: any) {
    this.loader.isLoading = true;
    if (id.target.value == 0) {
      this.rowdata = this.filterData;
      
      this.commonFunctionServices.bindDataTable("serviceRequestList", 0);
      this.loaderTimeOut();
    }
    else {
      this.rowdata = this.filterData.filter(x => x.statusId == (id.target.value));
      this.commonFunctionServices.bindDataTable("serviceRequestList", 0);
      this.status = id.target.value;
      this.loaderTimeOut();
    }

  }
  ZmstProjectGetAll() {

    //this.userId = this.localstore.get('userID');
    this.zmstProjectsService.getByUserId(this.userId).subscribe((data: any) => {
      this.zmstProjects = data;
    })
  }
  MdStatusGetAll() {
    this.mdStatusService.getAll().subscribe((data: any) => {
      this.mdStatus = data.filter(x => x.entityType == 'SR');

    })
  }
  viewDetails(rowdata: any) {
    let number = this.getRandomNumber();
    let serviceRequestNumber = EncyptionDecryption.Encrypt(rowdata.serviceRequestNo + number)
    this.router.navigate(['/servicerequestdetails/' + serviceRequestNumber]);
  }
  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }
  onAddClick() {
    let number = this.getRandomNumber();
    this.queryParam = EncyptionDecryption.Encrypt('generateService' + number);
    this.router.navigate(['/generateservicerequest' + '/' + this.queryParam])
  }

  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 1000);
  }
}
