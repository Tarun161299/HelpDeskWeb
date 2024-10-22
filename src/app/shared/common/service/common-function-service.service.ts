import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class CommonFunctionServices {
  datatable:any;
    constructor(private router: Router) {

    }

  bindDataTable(gridName: any,col:number) 
  {
    
   this.datatable = $('#' + gridName).DataTable();
    
    if(col==0){
      this.datatable.destroy();
      setTimeout(() => {
        $('#' + gridName).DataTable();
      }, 300);
      
    }
    
    else
    {
      this.datatable.destroy();
      setTimeout(() => {
        $('#' + gridName).DataTable({
          "order": [[col,'desc']],
        });
      }, 300);
      
    }
    
  }
}