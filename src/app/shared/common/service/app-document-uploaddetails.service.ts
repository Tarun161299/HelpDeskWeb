import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";

@Injectable({
  providedIn: "root"
})

export class AppDocumentUploadedDetails {
    constructor(private http: HttpClient) {

    }
    insert(data: any): Observable<any> {
        const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth',"1")
        return this.http.post<any>(ApiEndPoints.AppDocumentUploadedDetail_Insert, data, { headers: headers });
      } 

      GetByFileId(id:number): Observable<any> {
        const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth',"1")
        return this.http.get<any>(ApiEndPoints.AppDocumentUploadedDetail_GetByFileId+id.toString(), { headers: headers });
      }
      update(data:any): Observable<any> {
        const headers = { "Accept": "text/plain" }
        localStorage.setItem('isauth',"1")
        return this.http.post<any>(ApiEndPoints.AppDocumentUploadedDetail_Update, data, { headers: headers });
      } 
}