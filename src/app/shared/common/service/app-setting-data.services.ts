import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";

@Injectable({
  providedIn: "root"
})

export class AppSettingDataService {
    ticketdata:any
  constructor(private http: HttpClient) {

  }
GetHeaders(){
    localStorage.setItem('isauth',"0")
    return this.http.get<any>(ApiEndPoints.AppSettingDateHeaders);
}
//AppSettingResolutionDates

GetResolutionDates(data:string){
    localStorage.setItem('isauth',"0")
    return this.http.get<any>(ApiEndPoints.AppSettingResolutionDates+data);
}
}