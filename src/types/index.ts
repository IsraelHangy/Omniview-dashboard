export interface KPI {
    id: string;
    label: string;
    value: string | number;
    trend?: string;
    status: 'success' | 'warning' | 'danger' | 'neutral';
    icon: 'dollar' | 'users' | 'activity' | 'alert';
}

export interface ActivityData {
    name: string;
    value: number;
}

export interface RecentActivity {
    id: string;
    clientName: string;
    action: 'Commande' | 'Paiement' | 'Demande';
    status: 'Payé' | 'En attente' | 'Problème';
    timestamp: string;
}
