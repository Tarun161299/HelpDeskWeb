import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";

@Injectable({
  providedIn: "root"
})

export class MdStatusService {
    constructor(private http: HttpClient){

    }
        getAll(): Observable<any> {
          localStorage.setItem('isauth',"1")
            //const headers = { "Accept": "text/plain" }
            return this.http.get<any>(ApiEndPoints.MD_Status);
          }
}
