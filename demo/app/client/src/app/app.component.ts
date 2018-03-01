import { Component, OnInit } from '@angular/core';
import { Framework } from 'web-framework';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {
    let obj = <any>Framework.getPluginInstance('profile');
    obj.callMe();
  }
}
