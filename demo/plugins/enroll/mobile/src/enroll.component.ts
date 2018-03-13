import { Component } from "@angular/core";
import { ContainerService } from "sunbird";
import { IonicPage, ToastController } from "ionic-angular";
import { Student } from "./student.model"; 
import { HTTP } from "@ionic-native/http";


@IonicPage()
@Component({
    selector: 'page-course',
    templateUrl: './enroll.html',
    styleUrls: [
        './enroll.scss'
    ]
})
export class EnrollPage {

    student: Student = {};
    url: string = "http://172.16.0.117:9000/profile/user/v1/add";
    successToast: any;

    constructor(private http: HTTP, private toast: ToastController) {
        this.successToast = this.toast.create({
            message: 'User registered successfully',
            duration: 2000,
            position: 'bottom'
        });
    }

    onSubmit() {
        this.student.userId = Math.floor(Math.random() * 1000);
        this.http.setDataSerializer('json');
        this.http.post(this.url, this.student, {"Content-Type": "application/json"})
            .then((data) => {
                let responseData = JSON.parse(data.data);
                 if (responseData.status === "success") {
                    this.student = {};
                    this.successToast.present();
                 }

            })
            .catch((err) => {
                console.error("Save Request Failed", err);
            });
    }

}