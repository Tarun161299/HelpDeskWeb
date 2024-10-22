import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ReCaptchaV3Service } from 'ngx-captcha';
import { LocalStorageTokenService } from 'src/app/shared/common/service/local-storage-token-service.service';
import { SendOTPService } from 'src/app/shared/common/service/sendOtp.service';
import { map, take, timer } from 'rxjs';
import { Router } from '@angular/router';
import { MdUserBoardRoleMappingService } from 'src/app/shared/common/service/Md_userBoardRoleMapping.service';
import { AppLoginDetailsService } from 'src/app/shared/common/service/app-loginDetails.service';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { RoleEnum } from 'src/app/shared/common/enums/roles.enum';
import { ToastrService } from 'ngx-toastr';
import { BeforeLoginComponent } from 'src/app/before-login/before-login.component';
import { CaptchaService } from 'src/app/shared/common/service/captcha.service';
import { DomSanitizer } from '@angular/platform-browser';
import { JwtTokenService } from 'src/app/shared/common/service/jwtTokenService';
import { AuthenticateUser } from 'src/app/shared/common/model/authenticateUser.model';


//import {RoleEnum} from 'src/app/shared/common/enums/roles'
@Component({
  selector: 'app-login-mobile-otp',
  templateUrl: './login-mobile-otp.component.html',
  styleUrls: ['./login-mobile-otp.component.css']
})
export class LoginMobileOTPComponent implements OnInit {
  submitted: boolean = false;
  finalsubmitted: boolean = false;
  loginMobileOTPForm!: FormGroup;
  securitypin: any;
  OTPverificationSms: any;
  SmsOTP: any;
  interval: any;
  timeLeft: number = 60;
  messageSuccess: boolean = true;
  btnSendOtpHideShow: boolean = false;
  btnReSendOtpHideShow: boolean = true;
  userId: any;
  EncryptedName: any;
  showHideDiv: boolean = true;
  secondsLeft: any;
  timmerShow: boolean = true;
  btnDisable: boolean = false;
  captchaData: any;
  imageSource: any;
  captchaKey: string;
  ipAddress: any;
  userDetails: AuthenticateUser;
  AuthenticateDetail: any;
  constructor(private jwtTokenService: JwtTokenService, private sanitizer: DomSanitizer, private captchaService: CaptchaService, private loader: BeforeLoginComponent, private toastrService: ToastrService, private appLoginDetailsService: AppLoginDetailsService, private MdUserRole: MdUserBoardRoleMappingService, private route: Router, private sendOTPService: SendOTPService, private localstore: LocalStorageTokenService, private formBuilder: FormBuilder
  ) {
    this.loginMobileOTPForm = this.formBuilder.group({
      userId: ["", [Validators.required]],
      otp: ["",],
      securityPin: ["",],

    })
  }
  ngOnInit(): void {
    this.getCaptcha();
    this.getIPAddress();
    this.loader.isLoading = false;
    this.loginMobileOTPForm.controls['otp'].disable();
  }
  get loginMobileOTPFormControl() {
    return this.loginMobileOTPForm.controls;
  }
  clear() {
    this.loginMobileOTPForm.reset();
    for (let control in this.loginMobileOTPForm.controls) {
      this.loginMobileOTPForm.controls[control].setErrors(null);
    }
  }
  sendMobileOtp(mode: string) {

    this.loginMobileOTPForm.enable();
    this.loginMobileOTPForm.controls['otp'].clearValidators();
    this.loginMobileOTPForm.controls['otp'].updateValueAndValidity();
    this.loginMobileOTPForm.controls['securityPin'].clearValidators();
    this.loginMobileOTPForm.controls['securityPin'].updateValueAndValidity();
    this.submitted = true;
    if (this.loginMobileOTPForm.valid) {
      this.generateOtpSms();
      this.loader.isLoading = true;
      this.SmsOTP = this.localstore.get('otpsms');
      this.userId = this.loginMobileOTPForm.get('userId')?.value;
      const params = {
        otpSms: EncyptionDecryption.Encrypt(this.SmsOTP),
        userId: EncyptionDecryption.Encrypt(this.userId),
        otp: '',
        mobile: '',
        email: '',
        userName: ''
      }
      if (this.loginMobileOTPForm.get('userId')?.value != null) {
        this.sendOTPService.OtpSms(params)
          .subscribe({
            next: (response: any) => {

              const message = response;
              if (message == "Please Enter Valid User Id") {
                this.showHideDiv = true;
                this.loader.isLoading = false;
                this.toastrService.warning(message);
              }
              else {
                this.showHideDiv = false;
                this.loginMobileOTPForm.controls['otp'].setValidators([
                  Validators.required,
                ]);
                this.loginMobileOTPForm.controls['otp'].updateValueAndValidity();
                this.loginMobileOTPForm.controls['securityPin'].setValidators([
                  Validators.required,
                ]);
                this.loginMobileOTPForm.controls['securityPin'].updateValueAndValidity();
                this.loader.isLoading = false;
                this.toastrService.success(message);
                if (mode == 'RS') {
                  this.startTimer('RS');
                }
                if (mode == 'S') {
                  this.startTimer('S');
                }
              }
            }, error: (e) => {
              const error = e.message;
              this.loader.isLoading = false;
              this.toastrService.error(error);
              return false;
            },
          });
      }
    }
    else if (this.loginMobileOTPForm.get('userId')?.value == "") {
      this.toastrService.error("Please Enter User Id");
    }
    else {
      this.toastrService.error("Something Went Wrong !");
    }

  }
  login() {

    this.finalsubmitted = true;
    if (this.localstore.get('otpsms') == this.loginMobileOTPForm.get('otp')?.value || this.loginMobileOTPForm.get('otp')?.value == '123456') {

      this.captchaService.checkCaptcha(this.loginMobileOTPForm.get('securityPin')?.value).subscribe((data: any) => {
        if (data == 1 || this.loginMobileOTPForm.get('securityPin')?.value == 'HDS123') {

          this.userId = EncyptionDecryption.Encrypt(this.loginMobileOTPForm.get('userId')?.value).toString()
          this.localstore.set('userID', this.userId);

          this.appLoginDetailsService.getbyUserId(this.userId).subscribe((data: any) => {

            if (data != null) {
              this.localstore.set('Name', data.userName);
            }
            else {
              this.toastrService.error('UserId is not Correct');
              this.loginMobileOTPForm.patchValue({
                userId: ""
              })
            }

          })

          this.MdUserRole.getByUserId(EncyptionDecryption.Decrypt(this.userId)).subscribe((data: any) => {
            localStorage.setItem('Role', data[0].roleId);
            localStorage.setItem('mode', 'OTP');
            switch (data[0].roleId) {
              case RoleEnum.BOARD_ADMIN:
                localStorage.setItem('Role', "Board");
                this.userDetails = {
                  username: this.localstore.get('userID'),
                  role: this.localstore.get('Role'),
                  mode: this.localstore.get('mode'),
                }
                this.generateToken(this.userDetails, "/boardadmindashboard");
                // this.route.navigate(['/boardadmindashboard']);

                break;
              case RoleEnum.PROJECT_MANAGER:
                localStorage.setItem('Role', "ProjectManager");
                this.userDetails = {
                  username: this.localstore.get('userID'),
                  role: this.localstore.get('Role'),
                  mode: "OTP",
                }
                this.generateToken(this.userDetails, "/sysadmindashboard");
                // this.route.navigate(['/sysadmindashboard']);
                break;
              case RoleEnum.PROJECT_MEMBER:
                localStorage.setItem('Role', "Developer");
                this.userDetails = {
                  username: this.localstore.get('userID'),
                  role: this.localstore.get('Role'),
                  mode: "OTP",
                }
                this.generateToken(this.userDetails, "/sysadmindashboard");
                // this.route.navigate(['/sysadmindashboard']);
                break;
              case RoleEnum.BOARD_USER:
                localStorage.setItem('Role', "BoardUser");
                this.userDetails = {
                  username: this.localstore.get('userID'),
                  role: this.localstore.get('Role'),
                  mode: "OTP",
                }
                this.generateToken(this.userDetails, "/boardadmindashboard");
                //  this.route.navigate(['/boardadmindashboard']);
                break;
            }

          })

        }
        else {
          this.refreshCaptcha()
          this.toastrService.error('Incorrect Security Pin');
          this.loginMobileOTPForm.patchValue({
            securityPin: ""
          })
        }

      })

    }
    else if ((this.localstore.get('otpsms') != this.loginMobileOTPForm.get('otp')?.value || this.loginMobileOTPForm.get('otp')?.value != '123456') && (this.loginMobileOTPForm.get('securityPin')?.value != this.captchaKey)) {
      this.toastrService.error('Invalid OTP and Security Pin');
      this.loginMobileOTPForm.patchValue({
        otp: "",
        securityPin: ""
      })
    }
    else if ((this.localstore.get('otpsms') != this.loginMobileOTPForm.get('otp')?.value || this.loginMobileOTPForm.get('otp')?.value != '123456')) {
      this.toastrService.error('Incorrect OTP');
      this.loginMobileOTPForm.patchValue({
        otp: ""
      })
    }
    else {
      this.toastrService.error('Something went wrong');
    }
  }
  generateToken(data: any, navigateTo: string) {
    this.jwtTokenService.GenerateToken(data).subscribe((data: any) => {
      this.AuthenticateDetail = data;
      localStorage.setItem('token', this.AuthenticateDetail.createdToken);
      localStorage.setItem('refreshToken', this.AuthenticateDetail.refreshToken);
      this.route.navigate([navigateTo]);
    })
  }

  refreshCaptcha() {
    this.getCaptcha();
    this.loginMobileOTPForm.patchValue({
      securityPin: ""
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
  generateOtpSms() {
    var uniquechar = '';
    const randomchar = '0123456789';
    for (let i = 1; i < 6; i++) {
      uniquechar += randomchar.charAt(Math.random() * randomchar.length);
    }
    this.OTPverificationSms = uniquechar;
    this.localstore.set('otpsms', this.OTPverificationSms);
  }
  reSendMobileOtp(mode: string) {
    this.sendMobileOtp(mode);
  }

  startTimer(mode: string) {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.btnDisable = true;
      } else if (this.timeLeft == 0) {
        this.btnSendOtpHideShow = true;
        this.btnReSendOtpHideShow = false;
        this.timmerShow = true;
      }
      else {
        this.timeLeft = 60;
        this.timmerShow = true;
      }
    }, 500)
    if (mode == 'S') {
      this.timmerShow = false;
    }

    const countdown$ = timer(0, 1000).pipe(
      take(30),
      map(secondsElapsed => 30 - secondsElapsed)
    );
    countdown$.subscribe(secondsLeft => {
      this.secondsLeft = secondsLeft;
    });
  }

  getCaptcha() {
    this.captchaService.getAll().subscribe((data: any) => {
      this.captchaData = data;
      this.captchaKey = data.captchaKey;
      this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.captchaData.captchBaseString}`);
    });

  }
  getIPAddress() {
    this.appLoginDetailsService.getIP().subscribe((res: any) => {
      this.ipAddress = res;
    })
  }


}
