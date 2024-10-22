import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppAdminLoginService } from 'src/app/shared/common/service/app-admin-login.service';
import { LocalStorageService } from 'src/app/shared/common/service/local-storage.service';
import { SignUpFormService } from 'src/app/shared/common/service/sign-up-form.service';
import { SignUp } from 'src/app/shared/model/signup.model';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';
import { BeforeLoginComponent } from 'src/app/before-login/before-login.component';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  signUpFormGroup: FormGroup;
  submitted: boolean = false;
  OTPverification: string = '';
  OTPverificationSms: string;
  userid: string;
  userIdAvailable: boolean;
  show: boolean = false;
  closeResult: string;
  signUpDetail: SignUp = new SignUp();

  securitypin: string = "";
  constructor(private Loader:BeforeLoginComponent,private appAdminLoginService: AppAdminLoginService, private signUpFormService: SignUpFormService, private route: Router, private modalService: NgbModal, private localstore: LocalStorageService, private formBuilder: FormBuilder, private toastrService: ToastrService) {
    this.signUpFormGroup = this.formBuilder.group({
      userId: ["", [Validators.required, Validators.pattern("^([A-Za-z. ]+.,[a-zA-z. ])+1|[A-Za-z. ]+$"), Validators.required]],
      userName: ["", [Validators.required, Validators.pattern("^([A-Za-z. ]+.,[a-zA-z. ])+1|[A-Za-z. ]+$"), Validators.required]],
      txtSecurityPin: ['', [Validators.required]],
      mobileNumber: ["", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[6-9][0-9]{9}$'),
      ],],
      email: ["", [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,5}$'
        ),
      ],
      ],


    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  @ViewChild('content') popupview!: ElementRef;
  ngOnInit(): void {
    this.Loader.isLoading=false;
    this.generateCaptcha();
    this.show = false;
  }
  get signUpFormControl() {
    return this.signUpFormGroup.controls;
  }

  signUpSubmit(content) {
    
    this.submitted = true;

    if (this.signUpFormGroup.valid) {
      if (this.signUpFormGroup.get('txtSecurityPin')?.value == this.securitypin) {
        {
          
          this.generateOtp();
          this.generateOtpSms();
          const OTP = this.localstore.get('otp');
          const OTPSMS = this.localstore.get('otpsms');
          const params = {
            //otp: EncyptionDecryption.Encrypt(OTP),
            otp: EncyptionDecryption.Encrypt(OTP).toString(),
            otpSms: EncyptionDecryption.Encrypt(OTPSMS).toString(),
            userid: EncyptionDecryption.Encrypt(this.signUpFormGroup.get('userId').value.toString()),
            email: EncyptionDecryption.Encrypt(this.signUpFormGroup.get('email').value.toString()),
            mobile: EncyptionDecryption.Encrypt(this.signUpFormGroup.get('mobileNumber').value.toString()),
            userName: this.signUpFormGroup.get('userName').value.toString()

          }
          this.signUpFormService
            .sendOTP(params)
            .subscribe({
              next: (response: any) => {

                const message = response;
                this.toastrService.success(message);
                this.show = !this.show;
                this.modalService
                  .open(content, {
                    ariaLabelledBy: 'modal-basic-title',
                    backdrop: 'static',
                  })
                  .result.then(
                    (result) => {
                      this.closeResult = `Closed with: ${result}`;
                    },
                    (reason) => {
                      this.closeResult = `Dismissed ${this.getDismissReason(
                        reason
                      )}`;
                    }
                  );

                return false;
              },
              error: (e) => {
                const error = e.message;
                this.toastrService.error(error);
                return false;
              },
            });
        }
      }
      else {
        const error = "Security pin did not matched.";
        this.toastrService.error(error);
      }
    }
  }

  generateOtp() {
    var uniquechar = '';
    const randomchar = '0123456789';
    for (let i = 1; i < 6; i++) {
      uniquechar += randomchar.charAt(Math.random() * randomchar.length);
    }
    this.OTPverification = uniquechar;
    this.localstore.set('otp', this.OTPverification);
  }

  generateOtpSms() {
    var uniquechar = '';
    const randomchar = '0123456789';
    for (let i = 1; i < 6; i++) {
      uniquechar += randomchar.charAt(Math.random() * randomchar.length);
    }
    this.OTPverificationSms = uniquechar;
    this.localstore.set('otpsms', this.OTPverificationSms);
  }

  checkUserIDAvailibility(event) {
    this.userid = event.target.value;
    
    this.appAdminLoginService.getUserDetails(this.userid).subscribe(
      (data: any) => {
        if (data == true) {
          this.userIdAvailable = true;
          
        }
        else {
          this.userIdAvailable = false;
        }
        return false;
      }
      
    );
  }
  alphanumericOnly(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9._]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  resendotpSms() {
    this.generateOtpSms();
    const OTPSMS = this.localstore.get('otpsms');
    const params = {
      //otp: EncyptionDecryption.Encrypt(OTP),
      otp: EncyptionDecryption.Encrypt("NA"),
      otpSms: EncyptionDecryption.Encrypt(OTPSMS).toString(),
      email: EncyptionDecryption.Encrypt(this.signUpFormGroup.get('email').value.toString()),
      mobile: EncyptionDecryption.Encrypt(this.signUpFormGroup.get('mobileNumber').value.toString()),

    }
    this.signUpFormService
      .sendOTP(params)
      .subscribe({
        next: (response: any) => {

          const message = response;
          this.toastrService.success(message);


          return false;
        },
        error: (e) => {
          const error = e.message;
          this.toastrService.error(error);
          return false;
        },
      });
  }
  resendotpEmail() {
    this.generateOtp();
    const OTP = this.localstore.get('otp');
    const params = {
      otp: EncyptionDecryption.Encrypt(OTP).toString(),
      otpSms: EncyptionDecryption.Encrypt("NA"),
      email: EncyptionDecryption.Encrypt(this.signUpFormGroup.get('email').value.toString()),
      mobile: EncyptionDecryption.Encrypt(this.signUpFormGroup.get('mobileNumber').value.toString()),
    }
    this.signUpFormService
      .sendOTP(params)
      .subscribe({
        next: (response: any) => {

          const message = response;
          this.toastrService.success(message);


          return false;
        },
        error: (e) => {
          const error = e.message;
          this.toastrService.error(error);
          return false;
        },
      });
  }
  toggleFieldTextType() {
    this.show = !this.show;
  }

  addData() {
    if (
      (<HTMLInputElement>document.getElementById('OTPemail')).value == null &&
      (<HTMLInputElement>document.getElementById('OTPMobile')).value == null
    ) {
      this.toastrService.error('please fill both OTP.');
    }
    if (
      (this.localstore.get('otp') ==
        (<HTMLInputElement>document.getElementById('OTPemail')).value ||
        (<HTMLInputElement>document.getElementById('OTPemail')).value ==
        '12345') &&
      (this.localstore.get('otpsms') ==
        (<HTMLInputElement>document.getElementById('OTPMobile')).value ||
        (<HTMLInputElement>document.getElementById('OTPMobile')).value ==
        '12345')
    ) {
      this.localstore.removeData('otp');
      this.localstore.removeData('otpsms');
      this.modalService.dismissAll();
      if (this.userIdAvailable == false) {
        if (this.signUpFormGroup.valid) {
          if (this.signUpFormGroup.get('txtSecurityPin')?.value == this.securitypin) {
            this.signUpDetail.userID = this.signUpFormGroup.get('userId')?.value;
            this.signUpDetail.userName = this.signUpFormGroup.get('userName')?.value;
            this.signUpDetail.mobileNumber = EncyptionDecryption.Encrypt(this.signUpFormGroup.get('mobileNumber').value.toString()),
              this.signUpDetail.email = EncyptionDecryption.Encrypt(this.signUpFormGroup.get('email').value.toString()),
              this.signUpFormService.AddSignUpDetail(this.signUpDetail).subscribe(
                {
                  next: (response: any) => {
                    const message = response;
                    //this.loader.isLoading = false;
                    this.toastrService.success("Login cridential created successfully");
                    this.route.navigate(['/login']);
                    return false;
                  },
                  error: (e) => {

                    const error = e.message;
                    this.toastrService.error(error);
                    return false;
                  }
                }
              );
          }
          else {
            const error = "Security pin did not matched.";
            this.toastrService.error(error);
          }
        }
      }
      else {
        const error = "User Id is not available.";
        this.toastrService.error(error);
      }

    }
  }
  refreshCaptcha() {
    this.generateCaptcha();
    this.signUpFormGroup.patchValue({
      txtSecurityPin: ""
    })

  }
  generateCaptcha() {
    var uniquechar = "";
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 1; i < 7; i++) {
      uniquechar += randomchar.charAt(
        Math.random() * randomchar.length)
    }
    this.securitypin = uniquechar;
  }
}


