export interface GenieResponse<T> {
    message: string;
    result: T;
    status: boolean;
    errorMessages: Array<string>;
    error: string;
}