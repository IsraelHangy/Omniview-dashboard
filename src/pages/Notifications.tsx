import { PageContainer } from '../components/PageContainer';
import { useNotifications } from '../context/NotificationContext';
import { Bell, CheckCircle, Package, DollarSign, AlertTriangle, Trash2, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export const Notifications = () => {
    const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

    const getIcon = (type: string) => {
        switch (type) {
            case 'order': return <Package className="h-5 w-5 text-blue-500" />;
            case 'payment': return <DollarSign className="h-5 w-5 text-green-500" />;
            case 'stock': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
            default: return <Bell className="h-5 w-5 text-slate-500" />;
        }
    };

    return (
        <PageContainer title="Notifications">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-semibold text-slate-700">Toutes les notifications</h3>
                    <button
                        onClick={markAllAsRead}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                        <CheckCircle className="h-4 w-4" />
                        Tout marquer comme lu
                    </button>
                </div>

                <div className="divide-y divide-slate-50">
                    {notifications.length === 0 ? (
                        <div className="p-12 text-center text-slate-400">
                            <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            <p>Aucune notification pour le moment.</p>
                        </div>
                    ) : (
                        notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-4 hover:bg-slate-50 transition-colors flex gap-4 ${!notif.read ? 'bg-blue-50/30' : ''}`}
                                onClick={() => markAsRead(notif.id)}
                            >
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${!notif.read ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'bg-slate-100'}`}>
                                    {getIcon(notif.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className={`text-sm font-medium ${!notif.read ? 'text-slate-900' : 'text-slate-600'}`}>
                                            {notif.title}
                                            {!notif.read && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>}
                                        </h4>
                                        <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                                            {/* Note: In a real app we'd use date-fns properly, here simplistic fallback if lib missing or for simplicity */}
                                            {notif.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-0.5 truncate">{notif.message}</p>
                                </div>

                                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                                        className="p-1 text-slate-400 hover:text-red-500 rounded hover:bg-red-50"
                                        title="Supprimer"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </PageContainer>
    );
};
