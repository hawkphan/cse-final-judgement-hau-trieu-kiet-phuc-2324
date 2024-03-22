// /* eslint-disable @typescript-eslint/no-explicit-any */

  export interface Profile{
    userName?: string;
    firstName?: string;
    lastName?:string;
    email?: string;
    birthday?: string;
    isFemale?: boolean;
    displayName?: string;
  }
  export interface EditProfileBody {
    get: any;
    id?: string;
    userId?: string;
    image?:any;
    // description?: string;
    firstName?: string;
    lastName?: string;
    userName?:string;
    email?:string;
    birthday?: string;
    gender?: number;
  }
  export interface User {
    firstName: string;
    lastName: string;
    birthday: string;
    isFemale: boolean;
    displayName: string;
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: any;
    lockoutEnabled: boolean;
    accessFailedCount: number;
  }
  