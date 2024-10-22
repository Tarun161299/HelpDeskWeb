import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';
import { AppRemarks } from 'src/app/shared/common/model/app-remarks.model';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { AppRemarksService } from 'src/app/shared/common/service/app-remarks.service';
import { LocalStorageTokenService } from 'src/app/shared/common/service/local-storage-token-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  commentSectionForm: FormGroup;
  //@Input() boardid: string;
  @Input() data: any;
  @ViewChild('content') popupview!: ElementRef;
  fileToUpload: File | null = null;
  filename: string = '';
  fileextension: string = '';
  modifieddate: number = 0;
  fileUploadValidation: boolean = false;
  pdfSrc: string = '';
  base64textString: String = '';
  datacontent: String = '';
  comments:any;
  selectedFileB64:any;
  value:any;
  commentsave:AppRemarks;
  constructor(private modalService: NgbModal,private appRemarksService:AppRemarksService,private formBuilder: FormBuilder,private loader: AfterLoginComponent,private localstore: LocalStorageTokenService,private toastrService:ToastrService){
    this.commentSectionForm = this.formBuilder.group({
      commentSection: [""],
      uploadFile: [""],
    });
  }
  ngOnInit(): void {

    this.loader.isLoading = false;
    localStorage.getItem('Role');
    this.localstore.get('Name');
    this.localstore.get('userID');
    
    this.data;
    this.getComment();
  }

  addComment() {
    this.loader.isLoading=true;
    this.commentsave = {
      documentId: 0,
      activityid: "",
      ticketid: 0,
      cycleId: this.data[0].boardId.toString(),
      docType: this.fileextension,
      docId: "",
      docSubject: "",
      docContent: this.datacontent,
      objectId: "",
      objectUrl: "",
      docNatureId: "",
      ipAddress: "",
      subTime: "2023-07-03",
      id: 0,
      module: this.data[0].module.toString(),
      moduleId: Number(this.data[0].moduleId),
      remarks: this.commentSectionForm.get('commentSection').value,
      fileId: 0,
      createdDate: "2023-07-03",
      createdBy: EncyptionDecryption.Decrypt(this.localstore.get('userID')),
      createdIp: "",
      isActive: "",
    }
    
    this.appRemarksService.insert(this.commentsave).subscribe({
      next: (response: any) => {
        const message = response;
        this.getComment();
        this.loader.isLoading = false;
        this.toastrService.success(message);

      }, error: (e) => {
        const error = e.message;
        this.loader.isLoading = false;
        this.toastrService.error(error);
        return false;
      },
    });

  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    this.filename = event.target.files[0].name;
    this.fileextension = event.target.files[0].type;
    var size = event.target.files[0].size;
    this.modifieddate = event.target.files[0].lastModified;
    if (this.fileextension != 'application/pdf') {
      this.fileUploadValidation = true;
      this.toastrService.error('Please Upload Pdf File only');
    } else {
      this.fileUploadValidation = false;
      let $img: any = document.querySelector('#uploadFile');
      var reader = new FileReader();
      var readerbuffer = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      readerbuffer.onload = this._handleReaderLoaded2.bind(this);

      reader.readAsBinaryString(event.target.files[0]);
      readerbuffer.readAsArrayBuffer($img.files[0]);
    }
  }
  _handleReaderLoaded2(readerEvt: any) {
    let $img: any = document.querySelector('#uploadFile');
    this.pdfSrc = readerEvt.target.result;
  }
  _handleReaderLoaded(readerEvt: any) {

    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.datacontent = this.base64textString;
    return false;
  }

  getComment() {
      const remark = {
      module: this.data[0].module,
      moduleId: this.data[0].moduleId,
    }

    this.appRemarksService.getByModuleId(remark).subscribe((data: any) => {

      this.comments = data;
      this.commentSectionForm.patchValue({
        commentSection:"",
        uploadFile:""

      })
      this.loader.isLoading = false;
    }
    )
  }

  viewattachment(docContent: any) {
    if (docContent != null || docContent != "") {
      this.selectedFileB64 = docContent;
      this.modalService.open(this.popupview, { size: 'xl' });
    }
  }

}
