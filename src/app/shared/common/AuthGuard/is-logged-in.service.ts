import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
//import { TokenLocalStorageService } from '../tokenLocalStorage/tokenLocalStorageService';



@Injectable({ providedIn: 'root' })
export class IsLoggedIn implements CanActivate {
  constructor(
    private router: Router,
    //private storage:TokenLocalStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (localStorage.getItem('Role') != null) {
      if (localStorage.getItem('Role') == 'Board' || localStorage.getItem('Role') == 'BoardUser') {
        this.router.navigate(['/boardadmindashboard']);
        return false;
      }
      if (localStorage.getItem('Role') == 'ProjectManager' || localStorage.getItem('Role') == 'Developer') {
        this.router.navigate(['/sysadmindashboard']);
        return false;
      }
      else {
        
        return false;
      }
    

    }
    // if(localStorage.getItem('Role') == null){
    //   this.router.navigate(['/signin']);
    //   return false;
    // }
    else {
      return true;
    }

  }
}