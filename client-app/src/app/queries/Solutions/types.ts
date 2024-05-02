export interface Solution {
    id: string;
    userId: string;
    problemId: string;
    timeSubmitted: string;
    status: number;
    runTime: number;
    memoryUsage: number;
    languageName: string;
    languageId: string;
    source: string;
}

export interface CreateSolutionBody {
    userId: string;
    problemId: string;
    languageId: string;
    solution: string;
}