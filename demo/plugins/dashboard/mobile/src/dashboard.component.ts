import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { BasePlugin, ContainerService } from "sunbird";
import { HTTP } from "@ionic-native/http";
import { Student } from "./student.model"; 


@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: './dashboard.html',
    styleUrls:[
        './dashboard.scss'
    ]
})
export class DashboardPage {
    url: string = "http://172.16.0.117:9000/profile/user/v1/readAll";
    studentList: Array<Student> = [];

    constructor(private http: HTTP) {
        
    }

    ionViewWillEnter() {
        this.http.get(this.url, {}, {})
            .then((response) => {
                let data = JSON.parse(response.data);
                let studentListObj = data["data"];

                this.studentList = [];

                Object.keys(studentListObj).forEach(key => {
                    this.studentList.push(studentListObj[key]);
                });
            })
            .catch((error) => {

            })
    }
}