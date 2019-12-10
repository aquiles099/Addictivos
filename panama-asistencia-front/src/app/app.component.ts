import { Component } from '@angular/core';
import { AppSettings, Settings } from 'projects/emporium/src/app/app.settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public settings: Settings;
  constructor(public appSettings:AppSettings){
    this.settings = this.appSettings.settings;
  }
  title = 'panama-asistencia-front';




}
