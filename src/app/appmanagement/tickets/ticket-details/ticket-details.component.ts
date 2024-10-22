import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTicketService } from 'src/app/shared/common/service/app-ticket.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppDocumentUploadedDetails } from 'src/app/shared/common/service/app-document-uploaddetails.service';
import { DatePipe } from '@angular/common';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent {
  Ticketid: any;
  TicketDetails: any;
  datacontent: any;
  selectedFileB64: any;
  remarks:any=[];
  boardId:number;
  fileFormat:any;
  imgSource:any;
  constructor(private sanitizer: DomSanitizer,private loader: AfterLoginComponent, private datePipe: DatePipe,private toastrService:ToastrService, private modalService: NgbModal, private router: Router, private ticketService: AppTicketService, private route: ActivatedRoute, private documentdervice: AppDocumentUploadedDetails) {

  }
  @ViewChild('content') popupview!: ElementRef;
  @ViewChild('image') imageView !: ElementRef;
  ngOnInit() {
    this.loader.isLoading = true;
    this.Ticketid = Number(this.route.snapshot.params['ticketId'].toString())
    this.GetTicketdata();

  }
  onEditClick(id: number) {
    this.router.navigate(['/generateticket' + '/' + "ticket" + '/' + id.toString()])
  }
  onclickServiceRq() {
    if (localStorage.getItem('Role') == "Developer") {
      return;
    }
    this.viewDetails(this.TicketDetails);
  }
  GetTicketdata() {

    this.ticketService.getbyticketid(this.Ticketid).subscribe((data: any) => {
      this.TicketDetails = data[0];
      this.boardId = data[0].boardId;
      
      this.getTicketDocument();
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
  getTicketDocument() {
    if (this.TicketDetails.fileID != null) {
      this.documentdervice.GetByFileId(this.TicketDetails.fileID).subscribe((data: any) => {
        this.datacontent = data.docContent;
        
      })
    }
    this.loader.isLoading = false;
    this.GetRemarks();
  }
  GetRemarks(){
    
     this.remarks[0] = {
       boardId:this.boardId,
       module:"Ticket",
       moduleId:this.Ticketid
     }
  }
  btnDeleteTicket(){
    this.ticketService.delete(this.Ticketid).subscribe((data:any)=>{
      this.toastrService.success(data);
      this.router.navigate(['/ticket/AL'])
    })
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
}
