import { LayoutDashboard, BarChart2, Package, Users, Settings, LogOut, Bell, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
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
        <aside
            className={`
                fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-30 flex flex-col transition-transform duration-300 md:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
                <div className="flex items-center">
                    <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <span className="text-white font-bold text-lg">O</span>
                    </div>
                    <span className="ml-3 font-bold text-slate-800">Omniview</span>
                </div>
                <button
                    onClick={onClose}
                    className="md:hidden p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        onClick={() => onClose()} // Close on navigation on mobile
                        className={({ isActive }) => `
              w-full flex items-center justify-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
              ${isActive
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
            `}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && item.badge > 0 && (
                            <span className="absolute right-4 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                                {item.badge > 9 ? '9+' : item.badge}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 border-t border-slate-100">
                <button
                    onClick={() => window.location.reload()}
                    className="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all mt-1"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Déconnexion</span>
                </button>
            </div>
        </aside>
    );
};
