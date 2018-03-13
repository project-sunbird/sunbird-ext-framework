import { Component, OnInit } from '@angular/core';
import { Framework } from 'web-framework';
import { manifest } from './manifest';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  studentProfile = {};
  isRegistered = false;
  plugin: any;
  options = [
    "Architecture",
    "Automobile Engineering",
    " Chemical Engineering",
    "Civil Engineering",
    "Computer Science Engineering",
    "Art History",
    "Animal Science",
    "Accounting",
    "Advertising"
  ]
  constructor() { }

  ngOnInit() {
    this.plugin = Framework.getPluginInstance(manifest.id);
  }
  submitForm() {
    console.log("Test", this.studentProfile);
    if ((this.studentProfile) !== {}) {
      if (this.isRegistered) {
        this.isRegistered = false;
      } else {
        this.plugin.setStudentProfile(this.studentProfile).subscribe((data) => {
          if (data.body.status === "success") {
            this.studentProfile = {};
            this.isRegistered = true;
          }
        });
      }
    }
  }

}
