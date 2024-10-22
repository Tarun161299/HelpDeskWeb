import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";

@Injectable({
    providedIn: "root"
})

export class CaptchaService {

    constructor(private http: HttpClient) { }
    
    getAll(): Observable<any> {
        localStorage.setItem('isauth',"0")
      //  const headers = { "Accept": "text/plain" }
        return this.http.get<any>(ApiEndPoints.GetCaptcha);
    }
    checkCaptcha(key:string): Observable<any> {
        //localStorage.setItem('isauth',"0")
        localStorage.setItem('isauth',"0")
        const headers = { "Accept": "text/plain" }
        return this.http.post<any>(ApiEndPoints.Check_Captcha+key,{headers:headers});
    }
}