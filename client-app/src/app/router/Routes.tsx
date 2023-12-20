import {RouteObject,createBrowserRouter} from "react-router-dom"
import App from "../layout/App"
import HomePage from "../../features/Home"
import ProblemSet from "../pages/ProblemSet"
import { mockProblemList } from "../mock/MockProblems";


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
            }
        ]
    },
]

export const router = createBrowserRouter(routes)