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
    identifiers: Set<string>
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