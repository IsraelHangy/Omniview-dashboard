import { DollarSign, Users, Activity, AlertCircle } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const KPIGrid = () => {
    const { revenue, stats } = useBusiness();
    const [prevRevenue, setPrevRevenue] = useState(revenue);
    const [revAnimate, setRevAnimate] = useState(false);

    useEffect(() => {
        if (revenue !== prevRevenue) {
            setRevAnimate(true);
            const timer = setTimeout(() => setRevAnimate(false), 500);
            setPrevRevenue(revenue);
            return () => clearTimeout(timer);
        }
    }, [revenue, prevRevenue]);

    const kpis = [
        {
            label: 'Revenu Total',
            value: `${revenue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €`,
            change: '+12% vs semaine dernière',
            icon: DollarSign,
            color: 'bg-blue-500',
            isRevenue: true
        },
        {
            label: 'Utilisateurs Actifs',
            value: stats.activeUsers,
            change: 'En ligne maintenant',
            icon: Users,
            color: 'bg-purple-500'
        },
        {
            label: 'Santé Opérationnelle',
            value: `${stats.health}%`,
            change: 'Système stable',
            icon: Activity,
            color: 'bg-green-500'
        },
        {
            label: 'Alertes en attente',
            value: stats.alerts,
            change: '1 critique',
            icon: AlertCircle,
            color: 'bg-orange-500'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${kpi.color} bg-opacity-10`}>
                            <kpi.icon className={`h-6 w-6 ${kpi.color.replace('bg-', 'text-')}`} />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${index === 3 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {index === 3 ? 'Action requise' : '+2.5%'}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
                        {kpi.isRevenue ? (
                            <motion.h3
                                className="text-2xl font-bold text-slate-800"
                                animate={revAnimate ? { scale: [1, 1.1, 1], color: ['#1e293b', '#22c55e', '#1e293b'] } : {}}
                            >
                                {kpi.value}
                            </motion.h3>
                        ) : (
                            <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
                        )}
                        <p className="text-xs text-slate-400 mt-1">{kpi.change}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
