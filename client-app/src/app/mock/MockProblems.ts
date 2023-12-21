import { Course } from "../models/course";
import { Problem, Difficulty, Status, Tag } from "../models/problem";

export const mockCourseList: Course[] = [
  { id: "1", name: "Data Structure", price: "80800" },
];

export const diffitcultyFilter = [
  { key: 0, text: "All Difficulty", value: 0 },
  { key: 1, text: "Easy", value: 1 },
  { key: 2, text: "Medium", value: 2 },
  { key: 3, text: "Hard", value: 3 },
];

export const listSortOptions = [
  { key: 0, text: "All", value: 0 },
  { key: 2, text: "Attempted", value: 2 },
  { key: 3, text: "To do", value: 3 },
  { key: 4, text: "Completed", value: 4 },
];
export const tagSearchOptions = [
  { key: 1, text: "Choice 1", value: 1 },
  { key: 2, text: "Choice 2", value: 2 },
  { key: 3, text: "Choice 3", value: 3 },
];
export const value = "";
export const searchQuery = "";

export const mockProblemList: Problem[] = [
  {
    id: "1",
    status: Status.Solved,
    title: "Buying gifts",
    description: "Find the amount of money you will have leftover after buying the definite amount of gifts.",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "2",
    status: Status.Solved,
    title: "Planning a party",
    description: "Calculate to find the efficiency cost to hold a party.",
    difficulty: Difficulty.Hard,
    acceptance: "80",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "3",
    status: Status.Solved,
    title: "Remove Element",
    description: "Remove a certain element out of a collection.",
    difficulty: Difficulty.Medium,
    acceptance: "90",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "Find Path",
    description: "Find the shortest path lead to the destination.",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "Add two numbers",
    description: "Add two numbers in an existing array of numbers.",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "Two sum",
    description: "Calculate the sum of two random numbers",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "Palindrome Number",
    description: "Determine a number is a palindrome number or not.",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "Valentine",
    description: "Calculate to find the most precious gift for Valentine.",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "Buying more gifts",
    description: "Finding how many gifts can buy.",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  // Add more objects with unique ids as needed
];
