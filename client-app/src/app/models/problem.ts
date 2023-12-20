export type Problem = {
    id: string
    status: Status
    title: string
    description: string
    difficulty: Difficulty
    
    solution: string
    acceptance: string
    tags: Tag[]
}
export enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
}
export enum Status{
    Todo = 'To do',
    Attempted = 'Attempted',
    Solved = 'Solved'
}
export enum Tag {
    List = 'List',
    Sorting = 'Sorting',
    BinaryTree = 'Binary Tree'
}
