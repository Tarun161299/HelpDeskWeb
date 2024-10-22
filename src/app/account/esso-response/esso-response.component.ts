import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BeforeLoginComponent } from 'src/app/before-login/before-login.component';
import { RoleEnum } from 'src/app/shared/common/enums/roles.enum';
import { AuthenticateUser } from 'src/app/shared/common/model/authenticateUser.model';
import { Logout } from 'src/app/shared/common/model/logout.model';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { MdUserBoardRoleMappingService } from 'src/app/shared/common/service/Md_userBoardRoleMapping.service';
import { AppLoginDetailsService } from 'src/app/shared/common/service/app-loginDetails.service';
import { CaptchaService } from 'src/app/shared/common/service/captcha.service';
import { eSSOService } from 'src/app/shared/common/service/esso-service.serive';
import { JwtTokenService } from 'src/app/shared/common/service/jwtTokenService';
import { LocalStorageTokenService } from 'src/app/shared/common/service/local-storage-token-service.service';

@Component({
  selector: 'app-esso-response',
  templateUrl: './esso-response.component.html',
  styleUrls: ['./esso-response.component.css']
})
export class ESSOResponseComponent implements OnInit {
  logOut: string;
  requestId: any;
  ESSOData: any;
  userId: string;
  UserDetail: any;
  AuthenticateDetail: any;
  userDetails: AuthenticateUser;
  constructor(private jwtTokenService: JwtTokenService, private route: Router, private MdUserRole: MdUserBoardRoleMappingService, private appLoginDetailsService: AppLoginDetailsService, private router: ActivatedRoute, private eSSOService: eSSOService, private captchaService: CaptchaService, private loader: BeforeLoginComponent, private toastrService: ToastrService, private localstore: LocalStorageTokenService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loader.isLoading = true;
    this.requestId = this.router.snapshot.params['id'].toString();
    this.getbyId();
  }

  getbyId() {
    this.eSSOService.getbyId(this.requestId).subscribe((data: any) => {
      debugger
      this.ESSOData = data;

      if (data == null) {
        this.loader.isLoading = false;
        this.toastrService.error('UserId is not Correct');
        return;
      }
      this.UserDetail = JSON.parse(data.claimData);
      var eisId = this.UserDetail.sub;

      /**/
      // // localStorage.setItem('Client_id', EncyptionDecryption.Encrypt(data.id.toString()));
      localStorage.setItem('EISToken', EncyptionDecryption.Encrypt(data.tokenId.toString()));
      localStorage.setItem('User_id', EncyptionDecryption.Encrypt(this.UserDetail.userid.toString()));
      //localStorage.setItem('User_id', EncyptionDecryption.Encrypt(eisId));
      /**/

      this.loader.isLoading = true;
      //this.userId = EncyptionDecryption.Encrypt(this.UserDetail.userid)

      this.appLoginDetailsService.getByEisId(eisId).subscribe((data: any) => {
        if (data != null) {

          this.localstore.set('Name', data.userName);
          this.localstore.set('userID', EncyptionDecryption.Encrypt(data.userId));
          this.userId = data.userId;
          this.MdUserRole.getByUserId(this.userId).subscribe((data: any) => {
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
                break;
              case RoleEnum.PROJECT_MANAGER:
                localStorage.setItem('Role', "ProjectManager");
                this.userDetails = {
                  username: this.localstore.get('userID'),
                  role: this.localstore.get('Role'),
                  mode: "OTP",
                }
                this.generateToken(this.userDetails, "/sysadmindashboard");
                break;
              case RoleEnum.PROJECT_MEMBER:
                localStorage.setItem('Role', "Developer");
                this.userDetails = {
                  username: this.localstore.get('userID'),
                  role: this.localstore.get('Role'),
                  mode: "OTP",
                }
                this.generateToken(this.userDetails, "/sysadmindashboard");
                break;
              case RoleEnum.BOARD_USER:
                localStorage.setItem('Role', "BoardUser");
                this.userDetails = {
                  username: this.localstore.get('userID'),
                  role: this.localstore.get('Role'),
                  mode: "OTP",
                }
                this.generateToken(this.userDetails, "/boardadmindashboard");
                break;
            }
          })
        }
        else {
          this.toastrService.error('UserId is not Correct');
          return
        }
      })


      this.loader.isLoading = false;
    })
  }

  generateToken(data: any, navigateTo: string) {
    this.jwtTokenService.GenerateToken(data).subscribe((data: any) => {
      this.AuthenticateDetail = data;
      localStorage.setItem('token', this.AuthenticateDetail.createdToken);
      localStorage.setItem('refreshToken', this.AuthenticateDetail.refreshToken);
      this.route.navigate([navigateTo]);
    })
  }

}