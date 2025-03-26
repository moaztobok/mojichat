import { lazy } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';
const Login = lazy(() => import("@/pages/Login"));
export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
        
    );
}