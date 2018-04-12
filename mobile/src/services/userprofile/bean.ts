export class UserProfileDetailsRequest {
    userId: string;
    requiredFields: Array<string>;
    refreshUserProfileDetails: boolean;
}

export class TenantInfoRequest {
    slug: string;
    refreshTenantInfo: boolean;
}

export class UserSearchCriteria {
    query: string;
    offset: number;
    limit: number;
    identifiers: Array<String>
    fields: Array<String>;
}

export class UserProfileSkillsRequest {
    refreshProfileSkills: boolean;
}

export class EndorseOrAddSkillRequest {
    userId: string;
    skills: Array<String>;
}

export class ProfileVisibilityRequest {
    userId: string;
    privateFields: Array<string>;
    publicFields: Array<String>;
}

export class UploadFileRequest {
    filePath: string;
    userId: string;
}

export class UpdateUserInfoRequest {
    userId: String;
    firstName: String;
    lastName?: String;
    language: Array<String>;
    phone: String;
    profileSummary?: String;
    subject?: Array<String>;
    gender?: String;
    dob?: String;
    grade?: Array<String>;
    location?: String;
    webPages?: Array<UserWebPages>;
    education?: Array<UserEducation>;
    jobProfile?: Array<UserJobProfile>;
    address?: Array<UserAddress>;
}

export class UserWebPages {
    type: String;
    url: String;
}

export class UserEducation {
    degree: String;
    name: String;
    yearOfPassing?: Number;
    percentage?: Number;
    isDeleted?: Boolean;
    grade?: String;
    boardOrUniversity?: String;
    id?: String;
}

export class UserJobProfile {
    jobName: String;
    orgName: String;
    role?: String;
    subject?: Array<String>;
    isCurrentJob?: Boolean;
    joiningDate?: String;
    endDate?: String;
    id?: String;
    isDeleted?: Boolean;
}

export class UserAddress {
    addType: String;
    addressLine1: String;
    addressLine2?: String;
    city: String;
    state?: String;
    country?: String;
    zipcode?: String;
    isDeleted?: Boolean;
    id?: String;
}