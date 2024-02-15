export interface User {
    id: string;
    displayName: string;
    userName: string;
    token: string;
    image?: string;
}
export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
    firstName?:string;
    lastName?:string;
}