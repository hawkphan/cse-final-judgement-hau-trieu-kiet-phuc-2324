/* eslint-disable @typescript-eslint/no-explicit-any */
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
    id?: string;
    userId?: string;
    description?: string;
    firstName?: string;
    lastName?: string;
    userName?:string;
    email?:string;
    dateOfBirth: string;
    gender: string;
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
  