import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
//import { AuthService } from './auth/auth.service';
import { EMPTY, Observable, catchError, filter, first, of, switchMap, tap, throwError } from 'rxjs';
import { JwtTokenService } from './service/jwtTokenService';
import { AuthenticateUser } from './model/authenticateUser.model';
import { error } from 'jquery';
import { ApiEndPoints } from './constant/apiEndpoints';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  AuthenticateDetail: any;
  userInfo: AuthenticateUser;
  nextAuth:HttpHandler;
  requestAuth:HttpRequest<any>;
  Count:number=0;
  constructor(private jwtTokenService: JwtTokenService, private http: HttpClient) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('isauth') == '0') {
        request = request.clone({
        setHeaders: {
          Accept: "text/plain",
          responseType: "text",
        }

      });
      return next.handle(request);
    }

    else if (localStorage.getItem('isauth') == '1' ) {
      //this.Count=this.Count++;
      request = request.clone({
        setHeaders: {
          Accept: "text/plain",
          responseType: "text",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          RefreshToken: localStorage.getItem('refreshToken'),
        }
      });
      if(request.url.indexOf('JwtAuthentication/RefreshToken')==-1){
        
       // const a=new Date();

        localStorage.setItem('time',(new Date()).toString());
      }
      
      return next.handle(request);
       // return EMPTY
        
       // return EMPTY;
        //   this.jwtTokenService.RefreshToken().pipe(
        //     tap(token => this.jwtTokenService.newAccessToken = token), // side effect to set token property on auth service
        //     switchMap(token => {
        //        // use transformation operator that maps to an Observable<T>
        //        
        //       const newRequest = request.clone({
        //         setHeaders: {
        //           Authorization: `Bearer ${token}`
        //         }
        //       });
      
        //       return next.handle(newRequest);
        //     })
        //   );
           
       
        
        // // const AuthenticateDetail1=this.AuthenticateDetail;
        // // return next.handle(request);
        // return next.handle(request);
      }
     
    else {
      return next.handle(request);
      //return EMPTY;
      //return this.http.get<any>("");
    }

  }
  
   
}