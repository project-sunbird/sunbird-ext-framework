import { HTTPService } from "web-framework";

export class ClientPlugin {
    private studentProfile: any = {};

    public getUserProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            HTTPService.get('http://localhost:9000/profile/user/v1/readAll').subscribe((data) => {
                resolve(data);
            })
        })
    }
}