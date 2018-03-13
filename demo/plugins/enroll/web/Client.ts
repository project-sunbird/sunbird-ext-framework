import { HTTPService } from "web-framework";
export class ClientPlugin {
    private studentProfile: any = {}
    public setStudentProfile(profile: any): any {
        this.studentProfile = {
            userId: Math.floor(Math.random() * 1000),
            firstName: profile.firstName,
            lastName: profile.lastName,
            course: profile.course,
            userName: profile.userName,
            password: profile.password,
            confPassword: profile.confPassword,
            email: profile.email,
            contact: profile.contact
        }
        console.info('user details:', this.studentProfile);
        return HTTPService.post('http://localhost:9000/profile/user/v1/add', { body: this.studentProfile, json: true });
    }

}