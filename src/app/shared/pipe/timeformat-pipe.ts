import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";


@Pipe({
  name: "localTime"
})
export class LocalTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    var date = new Date(value);
    const returnValue = moment(date).format("dd/MM/yyyy H:mm");
    return returnValue;
  }
}
