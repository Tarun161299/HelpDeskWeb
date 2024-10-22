import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../../constants/apiEndpoints";


@Injectable({

    providedIn: 'root'

})

export class AppAdminLoginService {

    constructor(private http: HttpClient){

    }
    getUserDetails(userID:string):Observable<any>{
       // const headers={"Accept":"text/plain"}
        localStorage.setItem('isauth',"0")
        //localStorage.setItem('isauth', '0');
        return this.http.get<any>(ApiEndPoints.checkUserIdAvailibility+userID);
      }
   getCaptcha():Observable<any>{
  //  const headers={"Accept":"text/plain"}
    localStorage.setItem('isauth',"0")
    //localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.GetCaptcha);
  }
}
