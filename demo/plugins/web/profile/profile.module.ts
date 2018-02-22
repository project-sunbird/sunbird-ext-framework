import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileHeaderComponent } from './profile-header.component';
import { UserAvtarComponent } from './user-avtar.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [ProfileComponent, ProfileHeaderComponent, UserAvtarComponent],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
