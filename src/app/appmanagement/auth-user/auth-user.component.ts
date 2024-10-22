import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.css']
})
export class AuthUserComponent {
  constructor(private route: Router){

  }
  BoardAdmin(){
localStorage.setItem('Role',"Board");
this.route.navigate(['/sysadmindashboard']);
  }
  Projectmanager(){
    localStorage.setItem('Role',"ProjectManager")
    this.route.navigate(['/sysadmindashboard']);
  }
  ProjectMember(){
    localStorage.setItem('Role',"Developer")
    this.route.navigate(['/sysadmindashboard']);
  }
}
