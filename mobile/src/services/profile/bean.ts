export class Profile {
    uid?: string;
    handle?: string;
    avatar?: string;
    gender?: string;
    age: number = -1;
    day: number = -1;
    month: number = -1;
    standard: number = -1;
    language?: string;
    medium?: string[];
    board?: string[];
    isGroupUser?: boolean;
    profileType?: ProfileType;
    subject?: string[];
    grade?: string[];
    createdAt?: string;
}


export enum ProfileType {
    STUDENT = "student",
    TEACHER = "teacher",
}