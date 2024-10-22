import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";
import { AppRemarks } from "../model/app-remarks.model";

@Injectable({
    providedIn: "root"
})
export class AppRemarksService {

    constructor(private http: HttpClient) {

    }
    
    getByModuleId(remarksData:any){
       // const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth',"1")
        return this.http.post<any>(ApiEndPoints.AppRemarks_GetByModuleId,remarksData);  
        
    }

    insert(data: any): Observable<any> {
       // const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth',"1")
        return this.http.post<any>(ApiEndPoints.AppRemarks_Insert, data);
    } 
}
