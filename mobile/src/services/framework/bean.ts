export class CategoryRequest {
    currentCategory: string;
    prevCategory?: string;
    selectedCode?: Array<string>;
}
export class FrameworkDetailsRequest {
    frameworkId?: string;
    refreshFrameworkDetails?: boolean = false;
    defaultFrameworkDetails: boolean = true;
}