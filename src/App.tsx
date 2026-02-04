import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Inventory } from './pages/Inventory';
import { Team } from './pages/Team';
import { Settings } from './pages/Settings';
import { Notifications } from './pages/Notifications';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { NotificationProvider } from './context/NotificationContext';
import { BusinessProvider } from './context/BusinessContext';

function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <NotificationProvider>
                    <BusinessProvider>
                        <Router>
                            <Routes>
                                <Route element={<AppLayout />}>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/analytics" element={<Analytics />} />
                                    <Route path="/inventory" element={<Inventory />} />
                                    <Route path="/team" element={<Team />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/notifications" element={<Notifications />} />
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Route>
                            </Routes>
                        </Router>
                    </BusinessProvider>
                </NotificationProvider>
            </ToastProvider>
        </AuthProvider>
    );
}

export default App;
