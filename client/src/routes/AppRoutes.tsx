import { lazy } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

//layouts 
import { AuthLayout } from '@/components/layout/auth-layout';
import Home from '@/pages/Home';
export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<AuthLayout><Register /></AuthLayout>} />
            </Routes>
        </Router>

    );
}