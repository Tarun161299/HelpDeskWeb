import { Component } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {
  service:boolean=true;
  Tickets:boolean=true;
  ngOnInit(){
    
if(localStorage.getItem('Role')=='Board' || localStorage.getItem('Role')=='BoardUser'){
  this.Tickets=false;
}
if(localStorage.getItem('Role')=='Developer'){
  this.service=false;
}
}


}
