import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';
import { LoaderService } from 'src/app/shared/common/loader/loader.service';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { AppDocumentUploadedDetails } from 'src/app/shared/common/service/app-document-uploaddetails.service';
import { AppRemarksService } from 'src/app/shared/common/service/app-remarks.service';
import { AppServiceRequestService } from 'src/app/shared/common/service/app-service-request.service';
import { AppTicketService } from 'src/app/shared/common/service/app-ticket.service';
import { CommonFunctionServices } from 'src/app/shared/common/service/common-function-service.service';
import { MdSectionService } from 'src/app/shared/common/service/mdSection.service';
declare const $: any;
@Component({
  selector: 'app-service-requestdetails',
  templateUrl: './service-requestdetails.component.html',
  styleUrls: ['./service-requestdetails.component.css']
})

export class ServiceRequestdetailsComponent implements OnInit {
  requestEncyptId: any;
  serviceReqId: any;
  rowData: any;
  reqId: any;
  ticketData: any;
  boardID: any;
  serviceRequestId: any;
  serviceRequestID: any;
  queryParam: any;
  fileId: any;
  datacontent: any;
  selectedFileB64: any;
  Ticketshow: boolean = true;
  remarks: any = [];
  module: any;
  boardId: any;
  mdSection: any;
  fileFormat:any;
  imgSource:any;
  constructor(private sanitizer: DomSanitizer,private commonFunctionServices: CommonFunctionServices, private mdSectionService: MdSectionService, private appRemarksService: AppRemarksService, private loader: AfterLoginComponent, private toastrService: ToastrService, private loadingService: LoaderService, private datePipe: DatePipe, private appServiceRequest: AppServiceRequestService, private modalService: NgbModal, private router: Router, private ticketService: AppTicketService, private route: ActivatedRoute, private documentservice: AppDocumentUploadedDetails) {

  }
  @ViewChild('content') popupview!: ElementRef;
  @ViewChild('image') imageView !: ElementRef;
  ngOnInit(): void {
    this.requestEncyptId = this.route.snapshot.params['serviceRequestId'].toString();
    this.serviceReqId = EncyptionDecryption.Decrypt(this.requestEncyptId);
    this.serviceReqId = this.serviceReqId.substring(0, this.serviceReqId.length - 15);
    this.loader.isLoading = true;
    this.GetByReqId();
    this.getsection();

    if (localStorage.getItem('Role') == "Board" || localStorage.getItem('Role') == "BoardUser") {
      this.Ticketshow = false;
    }


  }

  OnAddTicket() {
    this.router.navigate(['/generateticket' + '/' + "Service" + '/' + (this.rowData[0].serviceRequestId).toString()])
  }
  GetByReqId() {
    
    this.reqId = EncyptionDecryption.Encrypt(this.serviceReqId);
    this.appServiceRequest.getByRequestServiceId(this.reqId)
      .subscribe({
        next: data => {
          if (data.length > 0) {

            this.rowData = data;
            this.boardID = this.rowData[0].boardId;
            this.serviceRequestID = this.rowData[0].serviceRequestId;
            this.fileId = this.rowData[0].fileId;
            this.module = this.rowData[0].module;
            this.GetTicketByBoardId();

          }

        }, error: (err: any) => {
        }
      })
  }
  GetTicketByBoardId() {
    
    const data = {
      boardID: this.boardID,
      serviceRequestID: this.serviceRequestID

    }

    this.ticketService.getByBoard(data)
      .subscribe({
        next: data => {
          if (data.length > 0) {
            this.ticketData = data;
            this.commonFunctionServices.bindDataTable("serviceRequestDetailsList", 0);
            this.loaderTimeOut();
          }
          else {
            this.ticketData = data;
            // this.toastrService.info('No Data in Ticket List');
          }

          if (this.fileId != null) {
            this.GetDocumentByFileId();
          }
          else {
            this.GetRemarks();
            // this.loadingService.setLoading(false);
            this.loader.isLoading = false;
          }

        }, error: (err: any) => {
          //this.router.navigate(['/Unauthorize']);
        }
      })

  }
  showticketDetail(data: any) {

    this.router.navigate(['/ticketdetails' + '/' + data.ticketId])
  }
  getHighPriorityIcon(data: any) {
    if (data.priority == "1") {
      return true
    }
    else {
      return false;
    }

  }
  getMedPriorityIcon(data: any) {
    if (data.priority == "2") {
      return true
    }
    else {
      return false;
    }

  }
  getLowPriorityIcon(data: any) {
    if (data.priority == "3") {
      return true
    }
    else {
      return false;
    }

  }




  getRandomNumber() {
    const today = new Date();
    let date = this.datePipe.transform(today, 'YYMMddHHMMSSSSS');
    return date;
  }
  onEdit() {
    let number = this.getRandomNumber();
    this.queryParam = EncyptionDecryption.Encrypt(this.serviceReqId + number);
    this.router.navigate(['/generateservicerequest' + '/' + this.queryParam]);
  }
  // btnPreviewPdf() {
  //   this.selectedFileB64 = this.datacontent;
  //   this.modalService.open(this.popupview, { size: 'xl' });
  // }
  btnPreviewPdf() {
    
        this.selectedFileB64 = this.datacontent;
       // this.data = this.datacontent,
        this.fileFormat=this.getFileExtension(this.selectedFileB64)
        if(this.fileFormat=='.jpg' || this.fileFormat=='.png'){
          this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
          this.modalService.open(this.imageView, { size: 'xl' });
         // this.imgSource=  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
        }
        else{
          this.modalService.open(this.popupview, { size: 'xl' });
        }
          
      }
  GetDocumentByFileId() {
    
    this.documentservice.GetByFileId(this.fileId).subscribe((data: any) => {
      this.datacontent = data.docContent;

      this.GetRemarks();
      // this.loadingService.setLoading(false);
      this.loader.isLoading = false;
    }
    )

  }
  GetRemarks() {

    this.remarks[0] = {
      boardId: this.boardID,
      module: "ServiceRequest",
      moduleId: this.serviceRequestID
    }
  }
  getsection() {
    this.mdSectionService.getAll().subscribe((data: any) => {

      this.mdSection = data;

    });
  }
  loaderTimeOut() {
    setTimeout(() => {
      this.loader.isLoading = false;
    }, 300);
  }
  getFileExtension(data: string): string {
    const binaryData = atob(data);
    const headerBytes = binaryData.substring(0, 4);
    const signatures: { [key: string]: string } = {
      "\x89PNG": '.png',
      "GIF8": '.gif',
      "\xFF\xD8\xFF\xE0": '.jpg',
      "\xFF\xD8\xFF\xDB": '.jpg',
      "%PDF-": '.pdf'
      // Add more file signatures as needed
    };

    for (const signature in signatures) {
      if (headerBytes.startsWith(signature)) {
        return signatures[signature];
      }
    }
    return '.dat';
  }
  btnDeleteService(){
    
this.appServiceRequest.delete(this.serviceRequestID).subscribe((data:any)=>{
  if(data==0){
    this.toastrService.error('Ticket has been created for this services')
  }
  else{
    this.toastrService.success('Delete Successfully')
    this.router.navigate(['servicerequestlist/AL'])
   // this.''
  }
})

  }
}
