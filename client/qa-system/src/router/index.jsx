import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import Chapters from '../pages/Chapters'
import Wrong from '../pages/Wrong'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Contests from '../pages/Contests'
import Exercise from '../pages/Exercise'
import Nodata from '../pages/Nodata'
import Incontest from '../pages/Incontest'
import Admin from '../pages/Admin'
import Changecontest from '../pages/Changecontest'
import Admincontests from '../pages/Admincontests'
import AddQuestion from '../pages/AddQuestion'
import Adminquestion from '../pages/Adminquestion'
import Adminstudents from '../pages/Adminstudents'
import FinishedList from '../pages/FinishedList'


const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/chapters' element={<Chapters />}></Route>
                <Route path='/wrong' element={<Wrong />}></Route>
                <Route path='/contests' element={<Contests />}></Route>
                <Route path='/exercise' element={<Exercise />}></Route>
                <Route path='/nodata' element={<Nodata />}></Route>
                <Route path='/incontest' element={<Incontest />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/admin' element={<Admin />}>
                <Route path='changecontest' element={<Changecontest />}></Route>
                <Route path='admincontests' element={<Admincontests />}></Route>
                <Route path='addquestion' element={<AddQuestion />}></Route>
                <Route path='adminstudents' element={<Adminstudents />}></Route>
                <Route path='adminquestion' element={<Adminquestion />}></Route>
                <Route path='finishedlist' element={<FinishedList />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter