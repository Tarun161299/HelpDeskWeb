import { Injectable } from '@angular/core';
import { EncyptionDecryption } from './EncyptionDecryption.service';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }
  public set(key: string, value: string) {
    if (key == 'token' || key == 'refreshToken')  {
      localStorage.setItem(key, value);
    }
    else {
      localStorage.setItem(key, EncyptionDecryption.Encrypt(value).toString());
    }
  }
  public get(key: string) {
    if(key=='token'||key=='refreshToken'){
      return localStorage.getItem(key);
      }
      return localStorage.getItem(key);
    //   else{
    //       return atob(localStorage.getItem(key));
    // }
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }
  public clearData() {
    localStorage.clear();
  }
}
