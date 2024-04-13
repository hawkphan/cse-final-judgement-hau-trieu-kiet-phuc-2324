export const PATHS = {
  
  root: "/",

  /* *************** DEVELOPER ************** */

  dev: "/developer",

  /* *************** UAM ************** */

  signup: "/signup",
  login: "/login",
  logout: "/logout",
  profile: "/profile/:id",
  editProfile: '/profile/edit',
  users: "/users",

  /* *************** PROBLEMS ************** */

  problems: "/problems",
  problemDetails: "/problems/:id",
  createProblem: "/problems/create",
  editProblem: "/problems/:id/edit",

  /* *************** CONTESTS ************** */

  contests: "/contests",
  createContest: "/contests/create",
  editContest: "/contests/:id/edit",
  contestPage: "/contest-page",
  contestManagement: "/contest-management",
  
};

export const HIDE_NAV_PATHS: string | string[] = [];
