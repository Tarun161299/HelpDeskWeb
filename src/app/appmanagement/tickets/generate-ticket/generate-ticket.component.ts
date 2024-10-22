import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';
import { ConfirmationDialogService } from 'src/app/shared/common/service/ConfimationPopupService/confirmation-dialog.service';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { MdPriorityService } from 'src/app/shared/common/service/MD_priority.service';
import { MdStatusService } from 'src/app/shared/common/service/Md_Status.service';
import { MdUserBoardRoleMappingService } from 'src/app/shared/common/service/Md_userBoardRoleMapping.service';
import { AppDocumentUploadedDetails } from 'src/app/shared/common/service/app-document-uploaddetails.service';
import { AppServiceRequestService } from 'src/app/shared/common/service/app-service-request.service';
import { AppTicketService } from 'src/app/shared/common/service/app-ticket.service';
import { MdSectionService } from 'src/app/shared/common/service/mdSection.service';

@Component({
  selector: 'app-generate-ticket',
  templateUrl: './generate-ticket.component.html',
  styleUrls: ['./generate-ticket.component.css'],
})
export class GenerateTicketComponent {
  role: string;
  Ticketid: Number;
  ServiceId: Number;
  submitted: boolean = false;
  TicketDetails: any;
  MDPrioritydata: any;
  boardid: any;
  MDStatusdata: any;
  UsersRoledata: any;
  fileToUpload: any;
  filename: any;
  fileextension: any;
  modifiedDate: any;
  fileUploadValidation: any;
  pdfSrc: any;
  base64textString: any;
  datacontent: any = '';
  generate: boolean = false;
  update: boolean = false;
  date: any;
  datetransform: any;
  GenerateTicketForm: FormGroup;
  data: string = "";
  selectedFileB64: string;
  showUpload: boolean = true;
  subjectOfService: string = "";
  mdSection: any;
  fileSizeValidation: any;
  fileFormat: any;
  imgSource: any;
  currentDate: Date = null;
  error: any = { isError: false, errorMessage: '' };
  constructor(private sanitizer: DomSanitizer, private router: Router, private mdSectionService: MdSectionService, private documentdervice: AppDocumentUploadedDetails, private loader: AfterLoginComponent, private toastrService: ToastrService, private modalService: NgbModal, private ServiceRequest: AppServiceRequestService, private confirmationDialogService: ConfirmationDialogService, private datePipe: DatePipe, private appDocument: AppDocumentUploadedDetails, private mdUserBoardRoleMappingServiceUser: MdUserBoardRoleMappingService, private route: ActivatedRoute, private mdStatusserviceUser: MdStatusService, private mdPriorityServiceUser: MdPriorityService, private ticketService: AppTicketService, private formBuilder: FormBuilder) {
    this.GenerateTicketForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
        ],
      ],
      serviceRequest: [''],
      Description: ['', [Validators.required]],
      AddAttachment: [''],
      ProgressStatus: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      assignedTo: [''],
      requestCategory: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    })
  }
  @ViewChild('content') popupview!: ElementRef;
  @ViewChild('image') imageView !: ElementRef;
  ngOnInit() {
    this.role = localStorage.getItem('Role')
    this.MdSectionGetAll();
    if (this.route.snapshot.params['page'].toString() == "Service") {
      this.ServiceId = Number(this.route.snapshot.params['ticketId'].toString());
      this.getServicedata();

    }
    else if (this.route.snapshot.params['page'].toString() == "ticket") {
      this.Ticketid = Number(this.route.snapshot.params['ticketId'].toString())
      this.GetTicketdata();
      if (localStorage.getItem('Role') == "Developer") {
        this.GenerateTicketForm.disable();
        this.GenerateTicketForm.controls['ProgressStatus'].enable();
        this.GenerateTicketForm.controls['AddAttachment'].enable();
      }
    }


  }
  GetTicketdata() {

    this.ticketService.getbyticketid(this.Ticketid.toString()).subscribe((data: any) => {
      this.TicketDetails = data[0];
      this.subjectOfService = this.TicketDetails.serviceRequestSubject
      this.generate = true;
      this.update = false;
      this.GenerateTicketForm.controls['serviceRequest'].disable();
      if (this.TicketDetails.assignStatus == "TA") {
        this.GenerateTicketForm.disable();
        this.GenerateTicketForm.controls['ProgressStatus'].enable();
        this.GenerateTicketForm.controls['AddAttachment'].enable();
        this.showUpload = false;
      }
      this.GenerateTicketForm.patchValue({
        title: this.TicketDetails.subject,
        serviceRequest: this.TicketDetails.serviceRequestSubject,
        Description: this.TicketDetails.description,
        requestCategory: this.TicketDetails.sectionId,
        // AddAttachment:this.TicketDetails,
        ProgressStatus: this.TicketDetails.taskStatus,
        priority: this.TicketDetails.priority,
        assignedTo: this.TicketDetails.assignTo,
        startDate: this.Changedatefmt(this.TicketDetails.startDate),
        endDate: this.Changedatefmt(this.TicketDetails.endDate),
      })
      this.getPriorityAll();
    })
  }
  get GenerateTicketFormControl() {
    return this.GenerateTicketForm.controls;
  }
  getPriorityAll() {
    this.mdPriorityServiceUser.getAll().subscribe((data: any) => {
      this.MDPrioritydata = data;
      this.getMdStatusAll()
    })
  }
  getMdStatusAll() {
    this.mdStatusserviceUser.getAll().subscribe((data: any) => {

      this.MDStatusdata = data.filter(x => x.entityType == "TP");

      this.getUserByRole();
    })

  }
  onDelete() {
    this.ticketService.delete(this.Ticketid).subscribe((data: any) => {
      this.toastrService.success(data);
      this.router.navigate(['/ticket/AL'])
    })
  }
  getUserByRole() {

    this.mdUserBoardRoleMappingServiceUser.getAll(this.TicketDetails.boardId.toString()).subscribe((data: any) => {

      this.UsersRoledata = data.filter(x => x.roleId == 32);
      this.getTicketDocument()

      //this.loader.isLoading = false;
    })
  }
  MdSectionGetAll() {

    this.mdSectionService.getAll().subscribe((data: any) => {
      this.mdSection = data;
    })
  }
  // handleFileInput(event: any) {
  //   
  //    this.fileToUpload = event.target.files[0];
  //    this.filename = event.target.files[0].name;
  //    this.fileextension = event.target.files[0].type;
  //    var size = event.target.files[0].size;
  //    this.modifiedDate = event.target.files[0].lastModified;
  //    if (this.fileextension != 'application/pdf') {
  //     this.fileUploadValidation = true;

  //    } else {
  //     this.fileUploadValidation = false;
  //     let $img: any = document.querySelector('#Uploadfile');
  //     var reader = new FileReader();
  //     var readerbuffer = new FileReader();
  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     readerbuffer.onload = this._handleReaderLoaded2.bind(this);

  //     reader.readAsBinaryString(event.target.files[0]);
  //    // readerbuffer.readAsArrayBuffer($img.files[0]);
  //    }
  //   }
  //   _handleReaderLoaded2(readerEvt: any) {
  //    let $img: any = document.querySelector('#Uploadfile');
  //    this.pdfSrc = readerEvt.target.result;
  //   }
  //   _handleReaderLoaded(readerEvt: any) {

  //    var binaryString = readerEvt.target.result;
  //    this.base64textString = EncyptionDecryption.Encrypt(binaryString);
  //    this.datacontent = this.base64textString;
  //    this.data = this.datacontent;
  //    return false;
  //   }
  handleFileInput(event: any) {
    
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    var size = event.target.files[0].size;
    // this.fileSizeValidation = size / 1024;
    if (size / (1024 * 1024) > 5) {
      this.fileSizeValidation = size / (1024 * 1024);
      //this.fileSizeValidation=size/1024;
      return
    }
    this.modifiedDate = event.target.files[0].lastModified;
    if ((this.fileextension != 'application/pdf') && (this.fileextension != 'image/png') && (this.fileextension != 'image/jpeg')) {
      this.fileUploadValidation = true;

    } else {
      this.fileUploadValidation = false;
      let $img: any = document.querySelector('#Uploadfile');
      var reader = new FileReader();
      var readerbuffer = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      readerbuffer.onload = this._handleReaderLoaded2.bind(this);

      reader.readAsBinaryString(event.target.files[0]);
      readerbuffer.readAsArrayBuffer($img.files[0]);
    }   
  }

_handleReaderLoaded2(readerEvt: any) {
  let $img: any = document.querySelector('#Uploadfile');
  this.pdfSrc = readerEvt.target.result;
}
_handleReaderLoaded(readerEvt: any) {

  var binaryString = readerEvt.target.result;
  this.base64textString = btoa(binaryString);
  //this.base64textString =binaryString;
  this.datacontent = this.base64textString;
  this.data = this.datacontent;
  return false;
}
updateTicket() {
  this.submitted = true;
  if (this.GenerateTicketForm.invalid) {
    return;
  }
  if (
    (this.TicketDetails.fileID == null && this.datacontent == '') ||
    (this.TicketDetails.fileID != null && this.datacontent == '')
  ) {
    const appticketModel = {
      ticketId: this.TicketDetails.ticketId,
      ticketNo: this.TicketDetails.ticketNo,
      serviceRequestId: this.TicketDetails.serviceRequestId,
      boardId: this.TicketDetails.boardId,
      sectionId: this.GenerateTicketForm.get('requestCategory').value,
      subject: this.GenerateTicketForm.get('title').value,
      description: this.GenerateTicketForm.get('Description').value,
      assignStatus:
        this.GenerateTicketForm.get('assignedTo').value == '' ? 'TU' : 'TA',
      taskStatus: this.GenerateTicketForm.get('ProgressStatus').value,
      priority: this.GenerateTicketForm.get('priority').value,
      assignTo: this.GenerateTicketForm.get('assignedTo').value,
      startDate: this.GenerateTicketForm.get('startDate').value,
      endDate: this.GenerateTicketForm.get('endDate').value,
      fileId: this.TicketDetails.fileID,
      createdDate: '2022-01-01',
      createdBy: '2022-01-01',
      createdIp: '',
      modifiedDate: '2022-01-01',
      modifiedBy: EncyptionDecryption.Decrypt(localStorage.getItem('userID')),
      modifiedIp: '',
    };
    this.confirmationDialogService
      .confirmPopUp('Do you really want to Submit?')
      .then((confirmed) => {
        if (confirmed == true) {
          {
            this.ticketService
              .update(appticketModel)
              .subscribe((data: any) => {
                const message = data;
                this.toastrService.success(message);
                this.router.navigate(['/ticket/AL']);
              });
          }
        }
      });
  }

  if (this.TicketDetails.fileID != null && this.datacontent != '') {
    const appticketModel = {
      ticketId: this.TicketDetails.ticketId,
      ticketNo: this.TicketDetails.ticketNo,
      serviceRequestId: this.TicketDetails.serviceRequestId,
      boardId: this.TicketDetails.boardId,
      sectionId: this.GenerateTicketForm.get('requestCategory').value,
      subject: this.GenerateTicketForm.get('title').value,
      description: this.GenerateTicketForm.get('Description').value,
      assignStatus:
        this.GenerateTicketForm.get('assignedTo').value == '' ? 'TU' : 'TA',
      taskStatus: this.GenerateTicketForm.get('ProgressStatus').value,
      priority: this.GenerateTicketForm.get('priority').value,
      assignTo: this.GenerateTicketForm.get('assignedTo').value,
      startDate: this.GenerateTicketForm.get('startDate').value,
      endDate: this.GenerateTicketForm.get('endDate').value,
      fileId: this.TicketDetails.fileID,
      createdDate: '2022-01-01',
      createdBy: '2022-01-01',
      createdIp: '',
      modifiedDate: '2022-01-01',
      modifiedBy: EncyptionDecryption.Decrypt(localStorage.getItem('userID')),
      modifiedIp: '',
    };
    this.confirmationDialogService
      .confirmPopUp('Do you really want to Submit?')
      .then((confirmed) => {
        if (confirmed == true) {
          {
            this.ticketService
              .update(appticketModel)
              .subscribe((data: any) => {
                const message = data;
                this.toastrService.success(message);
                this.router.navigate(['/ticket/AL']);
                this.savedocument();
              });
          }
        }
      });
  }
  if (this.TicketDetails.fileID == null && this.datacontent != '') {
    const uploadDoc = {
      documentId: 0,
      activityid: '1',
      id: this.TicketDetails.ticketId,
      mode: 'Ticket',
      cycleId: this.TicketDetails.boardId.toString(),
      docType: 'PDf',
      docId: '12',
      docSubject: this.GenerateTicketForm.get('title').value,
      docContent: this.datacontent,
      objectId: '',
      objectUrl: '',
      docNatureId: '',
      ipAddress: '',
      subTime: '2022-01-01',
      createdBy: '',
    };

    this.confirmationDialogService
      .confirmPopUp('Do you really want to Submit?')
      .then((confirmed) => {
        if (confirmed == true) {
          this.appDocument.insert(uploadDoc).subscribe((data: any) => {
            const fileID = data;

            //this.toastrService.success(message);
            const appticketModel = {
              ticketId: this.TicketDetails.ticketId,
              ticketNo: this.TicketDetails.ticketNo,
              serviceRequestId: this.TicketDetails.serviceRequestId,
              boardId: this.TicketDetails.boardId,
              sectionId: this.GenerateTicketForm.get('requestCategory').value,
              subject: this.GenerateTicketForm.get('title').value,
              description: this.GenerateTicketForm.get('Description').value,
              assignStatus:
                this.GenerateTicketForm.get('assignedTo').value == ''
                  ? 'TU'
                  : 'TA',
              taskStatus: this.GenerateTicketForm.get('ProgressStatus').value,
              priority: this.GenerateTicketForm.get('priority').value,
              assignTo: this.GenerateTicketForm.get('assignedTo').value,
              startDate: this.GenerateTicketForm.get('startDate').value,
              endDate: this.GenerateTicketForm.get('endDate').value,
              fileId: fileID,
              createdDate: '2022-01-01',
              createdBy: '2022-01-01',
              createdIp: '',
              modifiedDate: '2022-01-01',
              modifiedBy: EncyptionDecryption.Decrypt(
                localStorage.getItem('userID')
              ),
              modifiedIp: '',
            };
            this.ticketService
              .update(appticketModel)
              .subscribe((data: any) => {
                const message = data;
                this.toastrService.success(message);
                this.router.navigate(['/ticket/AL']);
              });
          });
        }
      });
  }
}
getTicketDocument() {
  if (this.TicketDetails.fileID != null) {
    this.documentdervice
      .GetByFileId(this.TicketDetails.fileID)
      .subscribe((data: any) => {
        this.datacontent = data.docContent;
        this.data = this.datacontent;
      });
  }
  this.loader.isLoading = false;
}
savedocument() {

  const uploadDoc = {
    documentId: this.TicketDetails.fileID,
    activityid: '1',
    ticketid: this.TicketDetails.ticketId,
    cycleId: this.TicketDetails.boardId.toString(),
    docType: 'PDf',
    docId: '12',
    docSubject: this.GenerateTicketForm.get('title').value,
    docContent: this.datacontent,
    objectId: '',
    objectUrl: '',
    docNatureId: '',
    ipAddress: '',
    subTime: '2022-01-01',
    createdBy: '',
  };

  this.appDocument.update(uploadDoc).subscribe((data: any) => {
    const message = data;

    this.toastrService.success(message);
    this.router.navigate(['/ticket/AL']);
  });
}
transformDate(date: string) {
  //2023-06-23 00:00:00.000
  this.datetransform = date.substring(0, 10).split('-');
  const datetrans =
    this.datetransform[1] +
    '/' +
    this.datetransform[2] +
    '/' +
    this.datetransform[0];
  return datetrans;
}
Changedatefmt(datein: string) {
  this.date = this.datePipe.transform(datein, 'yyyy-MM-dd');
  return this.date;
}
getServicedata() {
  const data = {
    serviceRequestId: Number(
      this.route.snapshot.params['ticketId'].toString()
    ),
    boardId: 0,
  };
  this.ServiceRequest.getByIddata(data).subscribe((data: any) => {
    this.TicketDetails = data[0];
    this.subjectOfService = this.TicketDetails.subject;
    this.generate = false;
    this.update = true;

    this.GenerateTicketForm.patchValue({
      serviceRequest: this.TicketDetails.subject,
    });
    this.getPriorityAll();
  });
}
GenerateTicket() {
  if (
    new Date(this.GenerateTicketForm.controls['startDate'].value) >
    new Date(this.GenerateTicketForm.controls['endDate'].value)
  ) {
    this.toastrService.error('Start Date Should be less than end Date');
    return;
  }
  if (this.fileSizeValidation > 5) {
    this.toastrService.error('Please Select Valid file')
    return
  }
  this.submitted = true;

  if (this.GenerateTicketForm.invalid) {
    return;
  }
  const appticketModel = {
    ticketId: 1,
    ticketNo: '',
    serviceRequestId: this.TicketDetails.serviceRequestId,
    boardId: this.TicketDetails.boardId,
    sectionId: this.GenerateTicketForm.get('requestCategory').value,
    subject: this.GenerateTicketForm.get('title').value,
    description: this.GenerateTicketForm.get('Description').value,
    assignStatus:
      this.GenerateTicketForm.get('assignedTo').value == '' ? 'TU' : 'TA',
    taskStatus: this.GenerateTicketForm.get('ProgressStatus').value,
    priority: this.GenerateTicketForm.get('priority').value,
    assignTo: this.GenerateTicketForm.get('assignedTo').value,
    startDate: this.GenerateTicketForm.get('startDate').value,
    endDate: this.GenerateTicketForm.get('endDate').value,
    createdDate: '2022-01-01',
    createdBy: EncyptionDecryption.Decrypt(localStorage.getItem('userID')),
    createdIp: ':1',
    modifiedDate: '2022-01-01',
    modifiedBy: EncyptionDecryption.Decrypt(localStorage.getItem('userID')),
    modifiedIp: '',
    docContent: this.datacontent,
    docType: 'application/pdf',
  };
  this.confirmationDialogService
    .confirmPopUp('Do you really want to Submit?')
    .then((confirmed) => {
      if (confirmed == true) {
        {
          this.ticketService.insert(appticketModel).subscribe((data: any) => {
            const message = data;
            this.toastrService.success(message);
            this.router.navigate(['/ticket/AL']);
          });
        }
      }
    });
}
// btnPreviewPdf(){
//     
//   this.selectedFileB64 = this.datacontent;
//   this.data = this.datacontent,

//   this.modalService.open(this.popupview, { size: 'xl' });
// }

btnPreviewPdf() {
  
  this.selectedFileB64 = this.datacontent;
  // this.data = this.datacontent,
  this.fileFormat = this.getFileExtension(this.selectedFileB64)
  if (this.fileFormat == '.jpg' || this.fileFormat == '.png') {
    this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
    this.modalService.open(this.imageView, { size: 'xl' });
    // this.imgSource=  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
  }
  else {
    this.modalService.open(this.popupview, { size: 'xl' });
  }

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

onSelectStartDate(event: any) {
  this.currentDate = event.target.value;
  this.checkDate();
}

onSelectEndDate() {
  this.checkDate();
}

checkDate() {
  if (
    new Date(this.GenerateTicketForm.controls['startDate'].value) >
    new Date(this.GenerateTicketForm.controls['endDate'].value)
  ) {
    this.error = {
      isError: true,
      errorMessage: 'End Date should be greater than start Date',
    };
  }
  else {
    this.error = {
      isError: false,
    };
  }
}

}

