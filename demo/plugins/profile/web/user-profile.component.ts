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
  isEdit = false;
  plugin: any;

  constructor() { }

  ngOnInit() {
    this.plugin = Framework.getPluginInstance(manifest.id);
    this.plugin.getUserProfile().then((data) => {
      this.userProfile = JSON.parse(data.body);
    });
  }
  editUserProfile() {
    if (this.isEdit) {
      console.log("userObject", this.userProfile);
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
    console.log("Edit the UserProfile Here");
  }
  saveUserProfile() {
    if (this.isEdit) {
      this.isEdit = false;
    }
    this.plugin.setUserProfile(this.userProfile);
  }
}

