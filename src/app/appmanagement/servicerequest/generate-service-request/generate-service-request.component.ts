import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';
import { AppServiceRequest } from 'src/app/shared/common/model/app-serviceRequest.model';
import { MdSectionModel } from 'src/app/shared/common/model/md-section.model';
import { MdStatus } from 'src/app/shared/common/model/md-status.model';
import { ZmstProjectsModel } from 'src/app/shared/common/model/zmst-projects.model';
import { ConfirmationDialogService } from 'src/app/shared/common/service/ConfimationPopupService/confirmation-dialog.service';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { MdPriorityService } from 'src/app/shared/common/service/MD_priority.service';
import { MdStatusService } from 'src/app/shared/common/service/Md_Status.service';
import { AppDocumentUploadedDetails } from 'src/app/shared/common/service/app-document-uploaddetails.service';
import { AppServiceRequestService } from 'src/app/shared/common/service/app-service-request.service';
import { LocalStorageTokenService } from 'src/app/shared/common/service/local-storage-token-service.service';
import { MdSectionService } from 'src/app/shared/common/service/mdSection.service';
import { ZmstProjectsService } from 'src/app/shared/common/service/zmstProjects.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppSettingDataService } from 'src/app/shared/common/service/app-setting-data.services';
import { DomSanitizer } from '@angular/platform-browser';
//import {fileTypeFromStream,fileTypeFromBuffer} from 'file-type';

@Component({
  selector: 'app-generate-service-request',
  templateUrl: './generate-service-request.component.html',
  styleUrls: ['./generate-service-request.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GenerateServiceRequestComponent implements OnInit {
  serviceRequestForm!: FormGroup;
  zmstProjects: ZmstProjectsModel[] = [];
  mdSection: MdSectionModel[] = [];
  mdStatus: MdStatus[] = [];
  serviceRequest: AppServiceRequest[] = []
  userId: any;
  submitted: boolean = false;
  fileToUpload: string = null;
  filename: string = null;
  fileextension: string = null;
  modifiedDate: any;
  fileUploadValidation: any;
  pdfSrc: any;
  base64textString: any;
  datacontent: any;
  boardId: any;
  priority: any;
  status: any;
  requestCategory: any;
  requestEncyptId: any;
  serviceReqId: any;
  reqId: any;
  rowData: any;
  boardID: any;
  serviceRequestID: any;
  hdnUpdate: boolean = true;
  hdnSubmit: boolean = false;
  date: any;
  fileId: number = null;
  selectedFileB64: string = "";
  data: any = "";
  Status: boolean = true;
  Updatebtn: boolean = true;
  fileAttach: boolean = true;
  MdPriority: any;
  multiSelect: any[] = [];
  CategoryIds: string = "";
  getSectionIds: any;
  DisableMUltiselect: boolean = false;
  serviceRequestControlForm: FormGroup;
  dropdownSettings: IDropdownSettings = {};
  todayDate:any=new Date();
  minDate:any;
  ONE_DAY = 1000 * 60 * 60 * 24;
  statusService:string="";
  role:string;
  fileSizeValidation:any=0 ;
  fileFormat:any;
  //this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  resolutionDate:any;
  imgSource:any;
  constructor(private sanitizer: DomSanitizer,private appSettingDataService:AppSettingDataService,private appDocument: AppDocumentUploadedDetails, private loader: AfterLoginComponent, private toastrService: ToastrService, private modalService: NgbModal, private appDocumentUploadedDetail: AppDocumentUploadedDetails, private router: ActivatedRoute, private route: Router, private appServiceRequest: AppServiceRequestService, private confirmationDialogService: ConfirmationDialogService, private mdStatusService: MdStatusService, private localstore: LocalStorageTokenService, private zmstProjectsService: ZmstProjectsService, private mdSectionService: MdSectionService, private formBuilder: FormBuilder, private datePipe: DatePipe, private mdPriorityService: MdPriorityService) {
    this.serviceRequestForm = this.formBuilder.group({
      boardName: ["", [Validators.required]],
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      priority: ["", [Validators.required]],
      // requestCategories: ["", [Validators.required]],
      status: ["", [Validators.required]],
      resolutionDate: ["", [Validators.required]],
      addAttachment: [""]

    });
    this.serviceRequestControlForm = new FormGroup({
      requestCategoriesSelected: new FormControl(this.multiSelect, Validators.required)
    });
  }
  @ViewChild('content') popupview!: ElementRef;
  @ViewChild('image') imageView !: ElementRef;
  ngOnInit(): void {
    
    this.role=localStorage.getItem('Role');
    this.dropdownSettings = {
      idField: 'sectionId',
      textField: 'section',
      enableCheckAll: true,

      noDataAvailablePlaceholderText: "Cycle is not created till Now"
    };
    // this.serviceRequestControlForm=new FormGroup({
    //   requestCategoriesSelected : new FormControl( this.multiSelect,Validators.required)
    // });
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.ZmstProjectGetAll();
    //this.MdSectionGetAll();
   // this.MdStatusGetAll();
   // this.MdPriorityGetAll();
    // this.requestEncyptId = this.router.snapshot.params['serviceRequestId'].toString();
    // this.serviceReqId = EncyptionDecryption.Decrypt(this.requestEncyptId);
    // this.serviceReqId = this.serviceReqId.substring(0, this.serviceReqId.length - 15);
    // if (localStorage.getItem('Role') == "Board" || localStorage.getItem('Role') == "BoardUser") {
    //   this.serviceRequestForm.controls['status'].clearValidators();
    //   this.serviceRequestForm.controls['status'].updateValueAndValidity();
    //   this.Status = false;
    // }

    // if (this.serviceReqId != "generateService") {

    //   this.GetByReqId();
    //   this.serviceRequestForm.controls['boardName'].disable();
    //   this.hdnUpdate = false;
    //   this.hdnSubmit = true;
    // }
    // 
    // if (this.serviceReqId == "generateService") {
    //   this.loader.isLoading = false;
    //   //this.serviceRequestForm.controls['boardName'].setValue(this.zmstProjects[0].projectId);
    //  // this.serviceRequestForm.controls['resolutionDate'].disable();
    // }
    // this.loader.isLoading = false;
  }

  ZmstProjectGetAll() {

    this.userId = this.localstore.get('userID');
    this.zmstProjectsService.getByUserId(this.userId).subscribe((data: any) => {
      this.zmstProjects = data;
      if (this.serviceReqId == "generateService") {
        this.loader.isLoading = false;
        this.serviceRequestForm.controls['boardName'].setValue(this.zmstProjects[0].projectId);
        this.boardId=this.zmstProjects[0].projectId;
        this.serviceRequestForm.controls['resolutionDate'].disable();
      }
      this.MdSectionGetAll();
    })
  }
  onItemSelect(item: any) {

    this.multiSelect = [...this.multiSelect, item];
  }
  onSelectAll(item: any) {
    this.multiSelect = item;
  }
  onItemDeSelect(item:any){
    
    this.multiSelect = this.multiSelect.filter((user) => user.sectionId !== item.sectionId);
  }
  onUnSelectAll() {
    this.multiSelect = null;
  }
  onDelete(){

  }
  MdSectionGetAll() {

    this.mdSectionService.getAll().subscribe((data: any) => {
      this.mdSection = data;
      this.MdStatusGetAll();
    })
  }
  MdStatusGetAll() {
    
    this.mdStatusService.getAll().subscribe((data: any) => {
      this.mdStatus = data.filter(x => x.entityType == 'SR');
      this.MdPriorityGetAll();
      //this.loader.isLoading = false;
    })
  }
  MdPriorityGetAll() {
    this.mdPriorityService.getAll().subscribe((data: any) => {
      
      this.MdPriority = data;
      this.requestEncyptId = this.router.snapshot.params['serviceRequestId'].toString();
      this.serviceReqId = EncyptionDecryption.Decrypt(this.requestEncyptId);
      this.serviceReqId = this.serviceReqId.substring(0, this.serviceReqId.length - 15);
      if (localStorage.getItem('Role') == "Board" || localStorage.getItem('Role') == "BoardUser") {
        this.serviceRequestForm.controls['status'].clearValidators();
        this.serviceRequestForm.controls['status'].updateValueAndValidity();
        this.Status = false;
      }
  
      if (this.serviceReqId != "generateService") {
  
        this.GetByReqId();
       
      }
      
      if (this.serviceReqId == "generateService") {
        this.loader.isLoading = false;
        //this.serviceRequestForm.controls['boardName'].setValue(this.zmstProjects[0].projectId);
       // this.serviceRequestForm.controls['resolutionDate'].disable();
      }
    })
  }
  get serviceRequestFormControl() {
    return this.serviceRequestForm.controls;
  }
  get serviceRequestControl() {
    return this.serviceRequestControlForm.controls;
  }
  clear() {
    this.serviceRequestForm.reset();
    for (let control in this.serviceRequestForm.controls) {
      this.serviceRequestForm.controls[control].setErrors(null);
    }
  }
  handleFileInput(event: any) {
    
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    var size = event.target.files[0].size;
   // this.fileSizeValidation = size / 1024;
    if (size / (1024*1024) > 5) {
      this.fileSizeValidation=size / (1024*1024) ;
      //this.fileSizeValidation=size/1024;
      return
    }
    this.modifiedDate = event.target.files[0].lastModified;
    if ((this.fileextension != 'application/pdf') && (this.fileextension != 'image/png') && (this.fileextension != 'image/jpeg') ) {
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
    this.datacontent = this.base64textString;
    this.data = this.datacontent;
    return false;
  }
  selectBoard(id: any) {
    this.boardId = id.target.value;
  }
  selectPriority(id: any) {
    
    var priority =this.MdPriority.filter(x=>x.priorityId==id.target.value)[0].priorityName;
    this.serviceRequestForm.controls['resolutionDate'].enable();
    //var priority=this.MdPriority.filter(x=>x.id==id.target.value)[0].
    this.appSettingDataService.GetResolutionDates(priority).subscribe((data:any)=>{
       let date =  (new Date().getTime())+ this.ONE_DAY*data
       this.resolutionDate=this.datePipe.transform(new Date(date), 'yyyy-MM-dd');
    })

    this.priority = id.target.value;
  }
  selectstatusByid(id: any) {
    
    var priority =this.MdPriority.filter(x=>x.priorityId==id)[0].priorityName;
   // this.serviceRequestForm.controls['resolutionDate'].enable();
    //var priority=this.MdPriority.filter(x=>x.id==id.target.value)[0].
    this.appSettingDataService.GetResolutionDates(priority).subscribe((data:any)=>{
       let date =  (new Date().getTime())+ this.ONE_DAY*data
       this.resolutionDate=this.datePipe.transform(new Date(date), 'yyyy-MM-dd');
    })

    this.priority = id;
  }

  selectStatus(id: any) {
    this.status = id.target.value;
  }
  selectRequestCategory(id: any) {
    this.requestCategory = id.target.value;
  }
  onSubmit() {

    this.CategoryIds = "";
    if(this.fileSizeValidation>5){
      this.toastrService.error('Please Select Valid file')
      return 
    }
    this.multiSelect;
    for (let i = 0; i < this.multiSelect.length; i++) {

      if (i == this.multiSelect.length - 1) {
        this.CategoryIds = this.CategoryIds + this.multiSelect[i].sectionId.toString();
      }
      else {
        this.CategoryIds = this.CategoryIds + this.multiSelect[i].sectionId.toString() + ","
      }
    }
    this.submitted = true;
    if (this.serviceRequestForm.valid && this.serviceRequestControlForm.valid) {


      const serviceRequestData =
      {
        boardId: this.boardId,
        subject: this.serviceRequestForm.get('title').value,
        description: this.serviceRequestForm.get('description').value,
        serviceRequestId: 0,
        serviceRequestNo: "",
        requestCategoryIds: this.CategoryIds,
        status: "RS",
        priority: this.priority,
        resolutionDate: this.serviceRequestForm.get('resolutionDate').value,
        fileId: 0,
        userId: this.localstore.get('userID'),
        createdDate: "2023-07-03T05:02:48.225Z",
        createdBy: this.localstore.get('userID'),
        createdIp: "",
        modifiedDate: "2023-07-03T05:02:48.225Z",
        modifiedBy: "",
        modifiedIp: "",
        fileName: this.filename,
        fileExtension: this.fileextension,
        content: this.datacontent,
      }
      this.confirmationDialogService.confirmPopUp("Do you really want to Submit?")
        .then(confirmed => {
          this.loader.isLoading = true;
          if (confirmed == true) {
            {

              this.appServiceRequest.insert(serviceRequestData).subscribe((data: any) => {

                this.loader.isLoading = false;
                const message = data;
                this.toastrService.success(message);
                this.route.navigate(['/servicerequestlist/AL']);

              })
            }
          }
        }
        )
    }
  }
  GetByReqId() {

    this.loader.isLoading = true;
    this.reqId = EncyptionDecryption.Encrypt(this.serviceReqId);
    this.appServiceRequest.getByRequestServiceId(this.reqId)
      .subscribe({
        next: data => {
          if (data.length > 0) {
            
            this.rowData = data;
            this.statusService=this.rowData[0].status;
            
            
            this.getSectionIds = this.rowData[0].requestCategoryIds.split(',')
            for (let i = 0; i < this.getSectionIds.length; i++) {
              this.multiSelect[i] = {
                sectionId: this.mdSection.filter(x => x.section == this.getSectionIds[i])[0].sectionId,
                section: this.mdSection.filter(x => x.section == this.getSectionIds[i])[0].section
              }
            }
            // this.serviceRequestControlForm=new FormGroup({
            //   requestCategoriesSelected : new FormControl( this.multiSelect,Validators.required)
            // });
            this.serviceRequestControlForm.get('requestCategoriesSelected').setValue(this.multiSelect)
            // this.serviceRequestForm=this.formBuilder.group({
            //   requestCategories : [ this.multiSelect,Validators.required]
            // });
            this.mdSection

            if (this.rowData[0].status == "Service Accepted" || this.rowData[0].status == "Service Closed") {
              
              this.serviceRequestForm.disable();
              //this.serviceRequestControlForm.disable();
              this.DisableMUltiselect = true;
              this.serviceRequestControlForm.get('requestCategoriesSelected').disable()
              this.Updatebtn = false;
              this.fileAttach = false;
            }
            
            this.selectstatusByid((this.rowData[0].priority == "High") ? 10 : (this.rowData[0].priority == "Medium") ? 20 : (this.rowData[0].priority == "Low") ? 30 : 0);
            this.selectedFileB64 = this.rowData[0].docContent;
            
            this.datacontent = this.selectedFileB64;
            this.data = this.selectedFileB64,
              //  this.serviceRequestForm.controls('')
              // this.serviceRequestForm.get('requestCategories').setValue(this.getSectionIds) ;
              this.fileId = this.rowData[0].fileId;
              this.serviceRequestForm.patchValue({
              boardName: Number(this.rowData[0].boardId),
              title: this.rowData[0].subject,
              description: this.rowData[0].description,
              priority: (this.rowData[0].priority == "High") ? 10 : (this.rowData[0].priority == "Medium") ? 20 : (this.rowData[0].priority == "Low") ? 30 : 0,
              requestCategories: Number(this.rowData[0].requestCategoryIds),
              status: (this.mdStatus.filter(x => x.description == this.rowData[0].status)[0].id),
              resolutionDate: this.Changedatefmt(this.rowData[0].resolutionDate),
            });
            this.loader.isLoading = false;
          }
          this.serviceRequestForm.controls['boardName'].disable();
          this.hdnUpdate = false;
          this.hdnSubmit = true;
          this.loader.isLoading = false;
        }, error: (err: any) => {
          //this.router.navigate(['/Unauthorize']);
        }
      })
  }
  Changedatefmt(datein: string) {
    this.date = this.datePipe.transform(datein, 'yyyy-MM-dd');
    return this.date;
  }

  onUpdate() {

    //const test=Number(this.zmstProjects.filter(x=>x.projectName == (this.serviceRequestForm.get('boardName').value))[0].projectId)
    this.submitted = true;
    this.CategoryIds = "";
    this.multiSelect;
    for (let i = 0; i < this.multiSelect.length; i++) {

      if (i == this.multiSelect.length - 1) {
        this.CategoryIds = this.CategoryIds + this.multiSelect[i].sectionId.toString();
      }
      else {
        this.CategoryIds = this.CategoryIds + this.multiSelect[i].sectionId.toString() + ","
      }
    }

    if (this.serviceRequestForm.valid) {

      if (this.fileId != null && this.datacontent != "") {
        const serviceRequest = {
          boardId: this.zmstProjects[0].projectId,
          subject: this.serviceRequestForm.get('title').value,
          description: this.serviceRequestForm.get('description').value,
          serviceRequestId: this.rowData[0].serviceRequestId,
          serviceRequestNo: this.serviceReqId,
          requestCategoryIds: this.CategoryIds,
          status: this.serviceRequestForm.get('status').value,
          priority: (this.serviceRequestForm.get('priority').value).toString(),
          fileId: this.fileId,
          resolutionDate: this.serviceRequestForm.get('resolutionDate').value,
          userId: this.localstore.get('userID'),
          createdDate: "2023-07-03",
          createdBy: "",
          createdIp: "",
          modifiedDate: "2023-07-03",
          modifiedBy: this.localstore.get('userID'),
          modifiedIp: "",
          fileName: this.filename,
          fileExtension: this.fileextension,
          content: this.datacontent,

        }
        this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
          .then(confirmed => {

            if (confirmed == true) {
              {
                this.loader.isLoading = true;
                this.appServiceRequest.update(serviceRequest).subscribe({
                  next: (data: any) => {
                    this.loader.isLoading = false;
                    const message = data;
                    this.updateDocument();
                    //alert(message)

                  },
                  error: (err: any) => {
                    this.loader.isLoading = false;
                    this.toastrService.error(err);
                  }
                })
              }
            }
          }
          )
      }

      if ((this.fileId != null && this.datacontent == "") || (this.fileId == null && this.datacontent == "")) {
        this.datacontent = "";
        const serviceRequest = {
          boardId: this.zmstProjects[0].projectId,
          subject: this.serviceRequestForm.get('title').value,
          description: this.serviceRequestForm.get('description').value,
          serviceRequestId: this.rowData[0].serviceRequestId,
          serviceRequestNo: this.serviceReqId,
          requestCategoryIds: this.CategoryIds,
          status: this.serviceRequestForm.get('status').value,
          priority: this.serviceRequestForm.get('priority').value.toString(),
          fileId: this.fileId,
          resolutionDate: this.serviceRequestForm.get('resolutionDate').value,
          userId: this.localstore.get('userID'),
          createdDate: "2023-07-03",
          createdBy: "",
          createdIp: "",
          modifiedDate: "2023-07-03",
          modifiedBy: this.localstore.get('userID'),
          modifiedIp: "",
          fileName: this.filename,
          fileExtension: this.fileextension,
          content: this.datacontent,

        }
        this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
          .then(confirmed => {
            if (confirmed == true) {
              {
                this.loader.isLoading = true;
                this.appServiceRequest.update(serviceRequest).subscribe({
                  next: (data: any) => {
                    const message = data;
                    this.toastrService.success(message);
                    this.route.navigate(['/servicerequestlist/AL']);
                    this.loader.isLoading = false;
                    // this.updateDocument();
                    //alert(message)

                  },
                  error: (err: any) => {
                    this.toastrService.error(err);
                    this.loader.isLoading = false;
                  }
                })
              }
            }
          }
          )
      }
      if ((this.fileId == null && this.datacontent != "")) {

        const uploadDoc = {

          documentId: 0,
          activityid: "1",
          id: this.rowData[0].serviceRequestId,
          mode: "ServiceRequest",
          cycleId: this.zmstProjects[0].projectId.toString(),
          docType: "PDf",
          docId: "12",
          docSubject: this.serviceRequestForm.get('title').value,
          docContent: this.datacontent,
          objectId: "",
          objectUrl: "",
          docNatureId: "",
          ipAddress: "",
          subTime: "2022-01-01",
          createdBy: ""

        }

        this.confirmationDialogService.confirmPopUp("Do you really want to Submit?")
          .then(confirmed => {
            if (confirmed == true) {
              this.loader.isLoading = true;
              this.appDocument.insert(uploadDoc).subscribe({
                next: (data: any) => {
                  const fileID = data;
                  const serviceRequest = {
                    boardId: this.zmstProjects[0].projectId,
                    subject: this.serviceRequestForm.get('title').value,
                    description: this.serviceRequestForm.get('description').value,
                    serviceRequestId: this.rowData[0].serviceRequestId,
                    serviceRequestNo: this.serviceReqId,
                    requestCategoryIds: this.CategoryIds,
                    status: this.serviceRequestForm.get('status').value,
                    priority: this.serviceRequestForm.get('priority').value.toString(),
                    fileId: fileID,
                    resolutionDate: this.serviceRequestForm.get('resolutionDate').value,
                    userId: this.localstore.get('userID'),
                    createdDate: "2023-07-03",
                    createdBy: "",
                    createdIp: "",
                    modifiedDate: "2023-07-03",
                    modifiedBy: this.localstore.get('userID'),
                    modifiedIp: "",
                    fileName: this.filename,
                    fileExtension: this.fileextension,
                    content: this.datacontent,

                  }
                  this.confirmationDialogService.confirmPopUp("Do you really want to Update?")
                    .then(confirmed => {
                      if (confirmed == true) {
                        {
                          this.appServiceRequest.update(serviceRequest).subscribe({
                            next: (data: any) => {
                              const message = data;
                              this.toastrService.success(message);
                              this.route.navigate(['/servicerequestlist/AL']);
                              this.loader.isLoading = false;

                              // this.updateDocument();
                              //alert(message)

                            },
                            error: (err: any) => {
                              this.toastrService.error(err);
                              this.loader.isLoading = false;
                            }
                          })
                        }
                      }
                    }
                    )
                  //this.toastrService.success(message);

                },
                error: (err: any) => {
                  this.toastrService.error(err);
                  this.loader.isLoading = false;
                }
              })
            }
          })
      }


    }

  }
  updateDocument() {
    
    const uploadDoc = {

      documentId: this.fileId,
      activityid: this.mdSection.filter(x => x.sectionId == this.rowData[0].sectionId).toString(),
      ticketid: 0,
      cycleId: (this.zmstProjects[0].projectId).toString(),
      docType: "PDf",
      docId: "",
      docSubject: this.serviceRequestForm.get("title").value,
      docContent: this.datacontent,
      objectId: "",
      objectUrl: "",
      docNatureId: "",
      ipAddress: "",
      subTime: "2022-01-01",
      createdBy: this.localstore.get('userID')

    }
    this.appDocumentUploadedDetail.update(uploadDoc).subscribe((data: any) => {
      const message = data;
      this.toastrService.success(message);
      this.route.navigate(['/servicerequestlist/AL']);
      this.loader.isLoading = false;
    })
  }

  btnPreviewPdf() {

    this.selectedFileB64 = this.datacontent;
    this.data = this.datacontent,
    this.fileFormat=this.getFileExtension(this.selectedFileB64)
    if(this.fileFormat=='.jpg' || this.fileFormat=='.png'){
      this.imgSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
      this.modalService.open(this.imageView, { size: 'xl' });
     // this.imgSource=  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.selectedFileB64}`);
    }
    if(this.fileFormat=='.pdf'){
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
      "%PDF":'.pdf'
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

