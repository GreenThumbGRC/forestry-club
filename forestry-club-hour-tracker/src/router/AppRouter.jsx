import { BrowserRouter, Routes, Route } from "react-router"
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import AdminReview from '../pages/AdminReview'
import AdminMemberView from '../pages/AdminMemberView'
import AdminClubView from '../pages/AdminClubView'
import Navigation from '../Navigation'
import Home from '../pages/Home'
import MemberHoursView from '../pages/MemberHoursView'
import LoginPortal from './../pages/LoginPortal'
import AddMember from "../pages/Signup"
import MemberHome from './../pages/MemberHome'
import { useAuth } from './../AuthContext'
import { ADMIN_ACTIVATED, USER_ACTIVATED } from "../projectVariables"

const AppRouter = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh' 
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    if (!user) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigation />}>
                        <Route index element={<LoginPortal />} />
                        <Route path='/signup' element={<AddMember />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    if (user.user_flags === USER_ACTIVATED) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigation />}>
                        <Route index element={<MemberHome />} />
                        <Route path='/hours' element={<MemberHoursView />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    if (user.user_flags === ADMIN_ACTIVATED) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigation />}>
                        <Route index element={<Home />} />
                        <Route path='/adminReview' element={<AdminReview />} />
                        <Route path='/adminClub/:email' element={<AdminMemberView />} />
                        <Route path='/adminClub' element={<AdminClubView />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    return null;
}

export default AppRouter