import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { MdSectionService } from '../common/service/mdSection.service';
import { AfterLoginComponent } from 'src/app/after-login/after-login.component';

@Pipe({
  name: 'ReqIds',
})
export class CommaSeperatedPipe implements PipeTransform {
  mdSection: any;
  constructor(public mdSectionService: MdSectionService,private loader: AfterLoginComponent) {
    
  }
  descriptionSection: string = '';
  sectionNumber: string[];


  transform(value: any,data:any, args?: any): any {
    this.descriptionSection = '';
    this.sectionNumber = value.split(',');   
   
    for (let i = 0; i < this.sectionNumber.length; i++) {
        if (i == this.sectionNumber.length - 1) {
          this.descriptionSection =  this.descriptionSection+data.filter(
            (x) => x.sectionId == Number(this.sectionNumber[i])
          )[0].section;
        } else {
          this.descriptionSection =this.descriptionSection+
            data.filter(
              (x) => x.sectionId == Number(this.sectionNumber[i])
            )[0].section + ',';
        }
      }
      return this.descriptionSection;
    
  }
}
