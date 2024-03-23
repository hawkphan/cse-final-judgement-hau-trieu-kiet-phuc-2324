export interface User {
    displayName: string;
    userName: string;
    token: string;
    image?: string;
    userProfile: UserProfile;
}
export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}

export interface UserProfile{
    rank?: string;
    views?: string;
    solutions?: string;
    discuss?: string;
    reputation?: string;
    languages?: string[];
    
    easyProblemSolved?: string;
    easyProblemSubmitted?: string;

    mediumProblemSolved?: string;
    mediumProblemSubmitted?: string;
    
    hardProblemSolved?: string;
    hardProblemSubmitted?: string;
    badges?: string[];
    submissions?: string[]
    totalActiveDays?: string;
    maxStreak?: string;
}