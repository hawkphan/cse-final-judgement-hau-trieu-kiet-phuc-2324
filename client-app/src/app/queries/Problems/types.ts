/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Problem {
  id?: string;
  code?: string;
  title?: string;
  difficulty?: number;
  description?: string;
  date?: string;
  user?: User;
  userId?: string;
  testCasesFiles?: any;
  problemLanguages?: any;
  privacyStatus?: number;
  gradeMode?: string;
  approximateRate?: number;
}

export interface CreateProblemBody {
  code?: string;
  title?: string;
  userId?: string;
  file?: any;
  date?: string;
  description?: string;
  timeLimit?: number;
  memoryLimit?: number;
  gradeMode?: string;
  approximateRate?: number;
  allowedLanguages?: string[];
  privacyStatus?: number;
}

export interface EditProblemBody {
  get: any;
  id?: string;
  code?: string;
  title?: string;
  userId?: string;
  file?: any;
  date?: string;
  description?: string;
  timeLimit?: number;
  memoryLimit?: number;
  gradeMode?: string;
  approximateRate?: number;
  allowedLanguages?: string[];
  privacyStatus?: number;
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
  token?: string;
  image?: string;
  roles?: string[];
}
