export interface User {
    id: string;
    displayName: string;
    userName: string;
    token: string;
    image?: string;
    roles?: string[];
}
export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
    firstName?:string;
    lastName?:string;
}

export interface ServerError {
    statusCode: number;
    message: string;
    details: string;
}