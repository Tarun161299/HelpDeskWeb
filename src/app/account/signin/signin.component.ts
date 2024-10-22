import { Component, OnInit } from '@angular/core';
import { BeforeLoginComponent } from 'src/app/before-login/before-login.component';
import { AppLoginDetailsService } from 'src/app/shared/common/service/app-loginDetails.service';
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements  OnInit{
  action:String;
  response_type:String;
  client_Id:String;
  redirect_uri:String;
  scope:String;
  state:String;
  ipAddress:any;
  constructor(private loader:BeforeLoginComponent,private appLoginDetailsService: AppLoginDetailsService){

  }
  ngOnInit(): void {
    this.loader.isLoading = false;
    this.ESSOOAuth();
    this.getIPAddress();
  }
  ESSOOAuth() {
    
    this.action = environment.action;
    this.response_type = environment.response_type;
    this.client_Id = environment.client_Id;
    this.redirect_uri = environment.redirect_uri;
    this.scope = environment.scope;
    this.state = environment.state;
  }

  getIPAddress() {
    this.appLoginDetailsService.getIP().subscribe((res:any)=>{
      this.ipAddress=res;
    })
  }

}
