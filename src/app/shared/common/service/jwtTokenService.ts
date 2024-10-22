import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable, delay, of, switchMap } from "rxjs";
import { ApiEndPoints } from "../constant/apiEndpoints";

@Injectable({
  providedIn: "root"
})


export class JwtTokenService {
    newAccessToken:any;
    AuthenticateDetail:any;
    constructor(private http: HttpClient){

    }

    GenerateToken(id:any): Observable<any> {
        localStorage.setItem('isauth',"0")
        return this.http.post<any>(ApiEndPoints.Authenticate , id);
    }
    RefreshToken():Observable<any> {
        const headers={"Accept":"text/plain", "responseType":"text","Authorization":`Bearer ${localStorage.getItem('token')}`,
       "RefreshToken" :localStorage.getItem('refreshToken')}        
        localStorage.setItem('isauth',"1")
        return this.http.get<any>(ApiEndPoints.RefreshToken,{ headers: headers });//.pipe(delay(1000));
        //return of('foo').pipe(delay(1000));//.pipe(delay(1000));
    }
 generateToken(request: HttpRequest<any>, next: HttpHandler ) {
    {
       return this.RefreshToken().subscribe(switchMap((data: any) => {
          
 
          this.AuthenticateDetail = data;
          const abd = data.headers;
          localStorage.setItem('token', this.AuthenticateDetail.createdToken);
          localStorage.setItem('refreshToken', this.AuthenticateDetail.refreshToken);
          return next.handle(request);
         
        }
        ))
      }
 
     // return this.http.get('');
      //return this.http.get<any>(ApiEndPoints.RefreshToken)
    }}
    