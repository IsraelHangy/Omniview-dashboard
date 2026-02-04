import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export const AppLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50/50">
            <Sidebar />
            <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
                <Header />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
