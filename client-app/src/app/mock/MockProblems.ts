import { Course } from "../models/course";
import { Problem, Difficulty, Status, Tag } from "../models/problem";

export const mockCourseList: Course[] = [
  { id: "1", name: "Data Structure", price: "80800" },
];

export const diffitcultyFilter = [
  { key: 0, text: "All Difficulty", value: 1 },
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
    title: "buying gifts",
    description: "lorem lorem lorem lorem lorem lorem lorem lorem",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "2",
    status: Status.Solved,
    title: "planning a party",
    description: "lorem lorem lorem lorem lorem lorem lorem lorem",
    difficulty: Difficulty.Hard,
    acceptance: "80",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "3",
    status: Status.Solved,
    title: "sống hộ",
    description: "lorem lorem lorem lorem lorem lorem lorem lorem",
    difficulty: Difficulty.Medium,
    acceptance: "90",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "tính đường",
    description: "lorem lorem lorem lorem lorem lorem lorem lorem",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "chuồng gà",
    description: "lorem lorem lorem lorem lorem lorem lorem lorem",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "Sương bóc thuốc",
    description: "lorem lorem lorem lorem lorem lorem lorem lorem",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "tân đi ăn trộm",
    description: "lorem lorem lorem lorem lorem lorem lorem lorem",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "valentine",
    description: "lorem lorem lorem lorem lorem lorem lorem lorem",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  {
    id: "1",
    status: Status.Solved,
    title: "buying more gifts",
    description: "lorem lorem lorem lorem lorem lorem lorem lorem",
    difficulty: Difficulty.Easy,
    acceptance: "70",
    solution: "none",
    tags: [Tag.List],
  },
  // Add more objects with unique ids as needed
];
