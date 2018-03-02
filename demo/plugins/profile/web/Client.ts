import { HTTPService } from 'web-framework'
export class ClientPlugin {
    private userProfile: any = {}
    public constructor() {

    }

    public setUserProfile(profile: any): any {
        this.userProfile.avatar = profile.avatar;
        this.userProfile.firstName = profile.firstName;
        this.userProfile.lastName = profile.lastName;
        this.userProfile.department = profile.department;
        this.userProfile.hireDate = profile.hireDate;
        this.userProfile.dob = profile.dob;
        this.userProfile.gender = profile.gender;
        this.userProfile.email = profile.email;
        this.userProfile.phone = profile.phone;

        HTTPService.post('http://localhost:9000/profile/user/v1/add', { body: this.userProfile, json: true }).subscribe((data) => {
            console.log('user profile saved!')
        })
    }

    public getUserProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            HTTPService.get('http://localhost:9000/profile/user/v1/read/123').subscribe((data) => {
                resolve(data);
            })
        })
    }
}