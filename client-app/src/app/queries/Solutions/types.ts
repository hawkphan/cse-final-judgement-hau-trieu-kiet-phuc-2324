export interface Solution {
    id: string;
    userId: string;
    problemId: string;
    timeSubmitted: string;
    status: number;
    runTime: number;
    memory: string;
    languageName: string;
    languageId: string;
    results: Result[];
}

export interface Result {
    id: string;
    solutionId: string;
    testCaseId: string;
    executionTime: number;
    status: number;
}

export interface CreateSolutionBody {
    userId: string;
    problemId: string;
    languageId: string;
    solution: string;
}