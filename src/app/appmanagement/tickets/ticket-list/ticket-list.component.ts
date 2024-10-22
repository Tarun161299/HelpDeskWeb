import { Component } from '@angular/core';
import { EncyptionDecryption } from 'src/app/shared/common/service/EncyptionDecryption.service';
import { AppTicketService } from 'src/app/shared/common/service/app-ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent {

  constructor(private appTicketService:AppTicketService){

  }
  ngOnInit(){

  }
  GetTicketData(){
    const userId=EncyptionDecryption.Decrypt(localStorage.getItem('userID'));
    
    this.appTicketService.getAll(userId).subscribe((data:any)=>{
     // this.ticketRowdata=data
    })
  }
}
