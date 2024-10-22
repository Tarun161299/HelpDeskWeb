import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiEndPoints } from './../../constants/apiEndpoints';
import { SignUp } from "../../model/signup.model";


@Injectable({

    providedIn: 'root'

})

export class SignUpFormService {
 constructor(private http: HttpClient,){
    }

    sendOTP(data:any){
       // const headers = {"Accept": "text/plain","Content-Type":"application/json"}  
       localStorage.setItem('isauth', '0');
        
        return this.http.post<any>(ApiEndPoints.OTPverification,data);
        //return this.http.post<any>(`${this.domain}`+ApiEndPoints.OTPverification,data);
      }

      AddSignUpDetail(addSignUp: SignUp):Observable<any>{
        var request = {
            UserID: addSignUp.userID,
            Email: addSignUp.email,
            Mobile: addSignUp.mobileNumber,
            UserName:addSignUp.userName
          }
          //const headers={"Accept":"text/plain","Content-Type":"application/json"}
          localStorage.setItem('isauth', '0');
          return this.http.post<any>(ApiEndPoints.SaveSignUpDetail,request);
      }
}