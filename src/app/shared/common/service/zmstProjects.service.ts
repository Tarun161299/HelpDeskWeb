import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";
@Injectable({
  providedIn: "root"
})

export class ZmstProjectsService {
  constructor(private http: HttpClient) {

  }

 insert(data: any): Observable<any> {
  localStorage.setItem('isauth',"1")
    //const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstProjects_Insert, data);
  } 
  update(data: any ): Observable<any> {
    localStorage.setItem('isauth',"1")
    //const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstProjects_Update, data);
  }
  delete(agencyid: any) {
    //localStorage.setItem('isauth',"1")
    const headers = { "Accept": "text/plain" }
    return this.http.post<any>(ApiEndPoints.ZmstProjects_Delete + agencyid, { headers: headers });
  }
  getAll(userId:any): Observable<any> {
    localStorage.setItem('isauth',"1")
  //  const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstProjects_GetAll);
  }
  getById(agencyid: any): Observable<any> {
    localStorage.setItem('isauth',"1")
    //const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstProjects_GetById + agencyid);
  }
  getByUserId(userId: any): Observable<any> {
    localStorage.setItem('isauth',"1")
    //const headers = { "Accept": "text/plain" }
    return this.http.get<any>(ApiEndPoints.ZmstProjects_GetByUserId + userId);
  }

    }