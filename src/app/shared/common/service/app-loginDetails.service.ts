import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";

@Injectable({
    providedIn: "root"
})
export class AppLoginDetailsService {

    constructor(private http: HttpClient) {

    }
    getbyUserId(userId:any): Observable<any> {
        localStorage.setItem('isauth',"0")
       // const headers = { "Accept": "text/plain" }
        return this.http.get<any>(ApiEndPoints.AppLoginDetails_GetByUserId + userId);
    }
    getIP():Observable<any[]> {
        //localStorage.setItem('isauth',"0")
      const headers = { "Accept": "text/plain" }
      localStorage.setItem('isauth',"0")
       return this.http.post<any>(ApiEndPoints.GetIP,{ headers: headers });
      }
    getByEisId(eisId:any): Observable<any> {
        localStorage.setItem('isauth',"0")
       // const headers = { "Accept": "text/plain" }
        return this.http.get<any>(ApiEndPoints.AppLoginDetails_GetByEisId + eisId);
    }
}
