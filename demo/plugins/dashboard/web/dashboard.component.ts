import { Component, OnInit } from '@angular/core';
import { Framework } from 'web-framework';
import { manifest } from './manifest';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  plugin: any;
  userProfiles = {}
  studentProfiles = [];
  constructor() { }

  ngOnInit() {
    this.plugin = Framework.getPluginInstance(manifest.id);
    this.plugin.getUserProfile().then((data) => {
      this.userProfiles = (JSON.parse(data.body)).data;
      for (var i in this.userProfiles) {
        if (i !== "undefined") {
          if (this.userProfiles.hasOwnProperty(i)) {
            this.studentProfiles.push(this.userProfiles[i]);
          }
        }
      }
      console.log("users", this.studentProfiles);
    });

  }

}
