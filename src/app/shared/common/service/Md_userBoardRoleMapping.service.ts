import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";

@Injectable({
  providedIn: "root"
})

export class MdUserBoardRoleMappingService {
    constructor(private http: HttpClient){

    }
        getAll(id:any): Observable<any> {
            //const headers = { "Accept": "text/plain" }
            localStorage.setItem('isauth',"0")
            return this.http.get<any>(ApiEndPoints.Md_UserBoardRoleMapping+id);
          }

          getByUserId(userid:any): Observable<any> {
            localStorage.setItem('isauth',"0")
            //const headers = { "Accept": "text/plain" }
            return this.http.get<any>(ApiEndPoints.Md_UserBoardRoleMapping_byUserId+userid);
          }
}