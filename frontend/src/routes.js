import { ToyApp } from "../src/pages/toy-app.jsx"
import { ToyEdit } from "../src/cmps/toy-edit.jsx"
import { ToyDetails } from "../src/cmps/toy-details.jsx"
import { About} from '../src/pages/about-us.jsx'
import { HomePage } from '../src/pages/home-page.jsx'
import { ReviewsExplore } from './pages/reviews-explore.jsx'
import {UserDetails} from './pages/user-details.jsx'
import {MyChart} from '../src/cmps/MyChart.jsx'
import { ChatApp } from "./pages/chat-app.jsx"

export default [{
        path: '/toy/edit/:toyId?',
        component: ToyEdit
    },
    {
        path: '/toy/:toyId',
        component: ToyDetails
    },
   
    {
        path: '/about',
        component: About
    },   
    {
        path: '/user-details',
        component: UserDetails
    },
    {
        path: '/reviews-explore',
        component: ReviewsExplore
    },
    {
        path: '/charts',
        component: MyChart
    },
    {
        path: '/chat',
        component: ChatApp
    },
    {
        path: '/toy',
        component: ToyApp
    },
    {
        path: '/',
        component: HomePage
    }
        // {
    //     path: '/user',
    //     component: UserProfile,
    // }
]