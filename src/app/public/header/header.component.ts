import { Component } from '@angular/core';
import { AppSettingDataService } from 'src/app/shared/common/service/app-setting-data.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  headers: any;

  constructor(private appSettingDataService: AppSettingDataService) {

  }

  ngOnInit(): void {

    this.appSettingDataService.GetHeaders().subscribe((data: any) => {
      this.headers = JSON.parse(data);
    })
  }
}
