import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { UserAvtarComponent } from './user-avtar/user-avtar.component';
import { HttpClientModule } from '@angular/common/http';
//import { UserProfileService } from './service/user-profile.service';
import { FrameworkAPI } from 'web-framework';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  declarations: [ProfileComponent, ProfileHeaderComponent, UserAvtarComponent],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule {

}
