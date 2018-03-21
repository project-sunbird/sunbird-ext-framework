export class UserProfileDetailsRequest {
    userId: string;
    requiredFields: Array<string>;
    refreshUserProfileDetails: boolean;
}

export class UserProfileSkillsRequest {
    refreshProfileSkills: boolean;
}