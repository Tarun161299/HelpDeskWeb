import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";

@Injectable({
  providedIn: "root"
})

export class AppTicketService {
    ticketdata:any
  constructor(private http: HttpClient) {

  }
  getByBoard(data:any){
    localStorage.setItem('isauth',"1")
   // const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.AppTicketByBoard,data);  
  }
  insert(data: any): Observable<any> {
    localStorage.setItem('isauth',"1")
//const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.AppTicket_Insert, data);
  } 
  update(data: any ): Observable<any> {
    localStorage.setItem('isauth',"1")
    //const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.AppTicket_Update, data);
  }
  delete(ticketid: any) {
    //localStorage.setItem('isauth',"1")
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.AppTicket_Delete + ticketid, { headers: headers });
  }
  getAll(userid:any): Observable<any> {
    
    localStorage.setItem('isauth','1');
    //const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.AppTicket_GetAll,userid);
  }
  getbyticketid(id:string): Observable<any> {
    localStorage.setItem('isauth',"1")
    //const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.AppTicket_GetById+id);
  }
}