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
    identifiers: Array<string>
    fields: Array<string>;
}

export class UserProfileSkillsRequest {
    refreshProfileSkills: boolean;
}

export class EndorseOrAddSkillRequest {
    userId: string;
    skills: Array<string>;
}

export class ProfileVisibilityRequest {
    userId: string;
    privateFields: Array<string>;
    publicFields: Array<string>;
}

export class UploadFileRequest {
    filePath: string;
    userId: string;
}

export class UpdateUserInfoRequest {
    userId: string;
    firstName?: string;
    lastName?: string;
    language?: Array<string>;
    phone?: string;
    profileSummary?: string;
    subject?: Array<string>;
    gender?: string;
    dob?: string;
    grade?: Array<string>;
    location?: string;
    avatar?: string;
    webPages?: Array<UserWebPages>;
    education?: Array<UserEducation>;
    jobProfile?: Array<UserJobProfile>;
    address?: Array<UserAddress>;
}

export class UserWebPages {
    type: string;
    url: string;
}

export class UserEducation {
    degree: string;
    name: string;
    yearOfPassing?: Number;
    percentage?: Number;
    isDeleted?: Boolean;
    grade?: string;
    boardOrUniversity?: string;
    id?: string;
}

export class UserJobProfile {
    jobName: string;
    orgName: string;
    role?: string;
    subject?: Array<string>;
    isCurrentJob?: Boolean;
    joiningDate?: string;
    endDate?: string;
    id?: string;
    isDeleted?: Boolean;
}

export class UserAddress {
    addType: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    country?: string;
    zipcode?: string;
    isDeleted?: Boolean;
    id?: string;
}