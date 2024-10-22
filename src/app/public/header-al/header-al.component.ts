import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { AppSettingDataService } from 'src/app/shared/common/service/app-setting-data.services';
import { JwtTokenService } from 'src/app/shared/common/service/jwtTokenService';
import { LocalStorageTokenService } from 'src/app/shared/common/service/local-storage-token-service.service';
import { eSSOService } from '../../../app/shared/common/service/esso-service.serive';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { ESSOResponseComponent } from 'src/app/account/esso-response/esso-response.component';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-header-al',
  templateUrl: './header-al.component.html',
  styleUrls: ['./header-al.component.css']
})
export class HeaderAlComponent implements OnInit, AfterViewInit, OnDestroy {

  claimid: string;
  userName: string;
  interval: any;
  intervalLogOut: any;
  AuthenticateDetail: any;
  delayInMilliseconds: any;
  timeNow: any;
  headers: any;
  constructor(private appSettingDataService: AppSettingDataService,
    private jwtTokenService: JwtTokenService,
    private localstore: LocalStorageTokenService,
    private router: ActivatedRoute,
    private route: Router,
    private eSSOService: eSSOService) {
  }


  ngOnInit(): void {
    this.appSettingDataService.GetHeaders().subscribe((data: any) => {
      //this.headersHindi=(JSON.parse(data));

      this.headers = JSON.parse(data);

    })

    this.interval = timer(0, (1000 * 60 * 55)).subscribe((res) => {

      if (res) {
        this.refreshToken();
      }
    })

    this.intervalLogOut = timer(0, (1000 * 60 * 60)).subscribe((res) => {
      this.timeNow = new Date().getTime();


      var diff = Math.abs(this.timeNow - new Date(localStorage.getItem('time')).getTime()) / 1000
      if (diff > 60 * 60) {
        localStorage.clear();
        this.interval.unsubscribe();
        this.intervalLogOut.unsubscribe();
      }
    })

  }

  ngOnDestroy() {

    this.interval.unsubscribe();
    this.intervalLogOut.unsubscribe();
  }

  ngAfterViewInit() {
    
    this.userName = this.localstore.get('Name');

  }

  onclickHome() {
    if (localStorage.getItem("Role") == "Developer") {
      this.route.navigate(['/sysadmindashboard']);
    }
    if (localStorage.getItem("Role") == "ProjectManager") {
      this.route.navigate(['/sysadmindashboard']);
    }
    if (localStorage.getItem("Role") == "Board") {
      this.route.navigate(['/boardadmindashboard']);
    }
    if (localStorage.getItem("Role") == "BoardUser") {
      this.route.navigate(['/boardadmindashboard']);
    }
  }

  onSignOutClick() {
    this.localstore.remove('Name');
    this.LogoutEis();
    localStorage.clear();

  }

  refreshToken() {
    this.jwtTokenService.RefreshToken().subscribe((data: any) => {
      this.AuthenticateDetail = data;
      localStorage.setItem('token', this.AuthenticateDetail.token);
      localStorage.setItem('refreshToken', this.AuthenticateDetail.refreshToken);
    });
  }

  LogoutEis() {   

    const logoutModel = {
      Client_id: environment.client_Id,  /* Development Client_id */  //EncyptionDecryption.Decrypt(localStorage.getItem('Client_id')),
      Token:   EncyptionDecryption.Decrypt(localStorage.getItem('EISToken')),
      User_id: EncyptionDecryption.Decrypt(localStorage.getItem('User_id'))
    }
    this.eSSOService.logOut(logoutModel).subscribe({
      next: (data: any) => {
        if (data > 0) this.route.navigate(['/']);        
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }
}


