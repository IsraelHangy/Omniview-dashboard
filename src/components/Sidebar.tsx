import { LayoutDashboard, BarChart2, Package, Users, Settings, LogOut, Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';

export const Sidebar = () => {
    const { unreadCount } = useNotifications();

    const navItems = [
        { icon: LayoutDashboard, label: 'Accueil', path: '/' },
        { icon: BarChart2, label: 'Analytique', path: '/analytics' },
        { icon: Package, label: 'Inventaire', path: '/inventory' },
        { icon: Users, label: 'Équipe', path: '/team' },
        { icon: Bell, label: 'Notifications', path: '/notifications', badge: unreadCount },
        { icon: Settings, label: 'Paramètres', path: '/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-white border-r border-slate-200 z-30 flex flex-col transition-all duration-300 hidden md:flex">
            <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-slate-100">
                <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <span className="text-white font-bold text-lg">O</span>
                </div>
                <span className="ml-3 font-bold text-slate-800 hidden md:block">Omniview</span>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) => `
              w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
              ${isActive
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
            `}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium hidden md:block">{item.label}</span>
                        {item.badge && item.badge > 0 && (
                            <span className="absolute top-2 right-2 md:top-auto md:right-4 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                                {item.badge > 9 ? '9+' : item.badge}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 border-t border-slate-100">
                <button
                    onClick={() => window.location.reload()}
                    className="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all mt-1"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium hidden md:block">Déconnexion</span>
                </button>
            </div>
        </aside>
    );
};
