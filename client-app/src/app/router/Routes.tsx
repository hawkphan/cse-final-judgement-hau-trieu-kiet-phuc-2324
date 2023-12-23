import {RouteObject,createBrowserRouter} from "react-router-dom"
import App from "../layout/App"
import HomePage from "../../features/Home"
import ProblemSet from "../pages/ProblemSet"
import { mockProblemList } from "../mock/MockProblems";
import ProblemDecription_Page from "../pages/Problem";
import SignInForm from "../pages/FormSignIn";
import SignUpForm from "../pages/FormSignUp";

export const routes: RouteObject[] =[
    {
        path: "/" ,
        element: <App />,
        children:[
            {
                path:'',
                element:<HomePage />
            },
            {
                path:'problems',
                element:<ProblemSet problems={mockProblemList} />
            },
            {
                path:'problem',
                element:<ProblemDecription_Page  submissions={mockProblemList} />
            },
            {
                path:'signin',
                element:<SignInForm />
            },
            {
                path:'signup',
                element:<SignUpForm />
            },
            
            
        ]
    },
]

export const router = createBrowserRouter(routes)