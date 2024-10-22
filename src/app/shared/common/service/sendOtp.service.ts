import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageTokenService } from './local-storage-token-service.service';
import { ApiEndPoints } from '../constant/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class SendOTPService{
    constructor(private storage:LocalStorageTokenService,private http: HttpClient,) {

     }

    OtpSms(data:any){
      localStorage.setItem('isauth',"0")
       // const headers = {"Accept": "text/plain","Content-Type":"application/json"}  
        return this.http.post<any>(ApiEndPoints.OTPverification,data);
    } 
}