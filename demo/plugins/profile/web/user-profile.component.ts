import { Component, OnInit, Input } from '@angular/core';
import { Framework } from 'web-framework';
import { manifest } from './manifest';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: any = {};
  constructor() { }

  ngOnInit() {
    let plugin = Framework.getPluginInstance(manifest.id);
    this.userProfile = plugin.getUserProfile();
  }

}
