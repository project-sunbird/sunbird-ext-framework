export class ClientPlugin {
    private userProfile: any = {}
    public constructor() {
        this.userProfile.avator = "https://sunbirddev.blob.core.windows.net/user/874ed8a5-782e-4f6c-8f36-e0288455901e/File-01242833565242982418.png";
        this.userProfile.firstName = "John";
        this.userProfile.lastName = "Doe";
        this.userProfile.department = "Science";
        this.userProfile.hireDate = "12/11/2010";
        this.userProfile.dob = "14/4/1978";
        this.userProfile.gender = "Male";
        this.userProfile.email = "john.doe@test.com";
        this.userProfile.phone = "9876543210";
    }
    public getUserProfile(): object {
        return this.userProfile
    }
}