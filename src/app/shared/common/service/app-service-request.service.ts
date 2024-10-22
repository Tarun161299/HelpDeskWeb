
import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";
import { AppServiceRequest } from "../model/app-serviceRequest.model";

@Injectable({
  providedIn: "root"
})

export class AppServiceRequestService {
  rowdata: any;
  ticketRowdata: any;

  @Output() uplopadDataEvt: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {

  }

  delete(id:any){
    localStorage.setItem('isauth',"1")
    return this.http.get<any>(ApiEndPoints.AppServiceRequest_Delete+id);

  }

  setItem(data: any) {
    localStorage.setItem('ticketdata', JSON.stringify(data));
  }
  getItem(key: string) {
    return (localStorage.getItem(key));
  }
  //   getAll(): Observable<any> {
  //     const headers = { "Accept": "text/plain" }
  //     return this.http.get<any>(ApiEndPoints.AppServiceRequest_GetAll, { headers: headers });
  //   }
  insert(data: any): Observable<any> {
    //this.tokenExpire.isTokenExpired();
   // const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth',"1")
    //localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppServiceRequest_Insert, data);
  }
  getByUserId(userId: any) {
   // const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth',"1")
    return this.http.post<any>(ApiEndPoints.AppServiceRequest_GetByUserId ,userId);
  }
  getByIddata(data: any): Observable<any> {
    //this.tokenExpire.isTokenExpired();
   // const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth',"1")
    //localStorage.setItem('isauth', '1');
    return this.http.post<any>(ApiEndPoints.AppServiceRequest_GetByIdData, data);
  }

  getByRequestServiceId(reqId:any): Observable<any> {
   // const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth',"1")
    return this.http.get<any>(ApiEndPoints.AppServiceRequest_GetByServiceRequestId + reqId);
  }

  update(data: any): Observable<any> {
    
   // const headers = { "Accept": "text/plain" }
    localStorage.setItem('isauth',"1")
    return this.http.post<any>(ApiEndPoints.AppServiceRequest_Update, data);
  }
GetDashboardCount(data:any): Observable<any> {
    
 // const headers = { "Accept": "text/plain" }
  localStorage.setItem('isauth',"1")
  return this.http.post<any>(ApiEndPoints.GetDashBoardCount, data);
}

}