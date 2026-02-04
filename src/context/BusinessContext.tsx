import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNotifications } from './NotificationContext';

export interface Operation {
    id: string;
    client: string;
    type: string;
    amount: string;
    status: string;
    date: string;
    rawAmount: number; // For calculations
}

interface BusinessContextType {
    revenue: number;
    operations: Operation[];
    stats: {
        activeUsers: number;
        health: number;
        alerts: number;
    };
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
    const { addNotification } = useNotifications();

    const [revenue, setRevenue] = useState(12450.00);
    const [stats, setStats] = useState({
        activeUsers: 184,
        health: 98.2,
        alerts: 5
    });

    const [operations, setOperations] = useState<Operation[]>([
        { id: '1', client: 'Sophie Martin', type: 'Commande', amount: '129,99 €', rawAmount: 129.99, status: 'Payé', date: 'Il y a 2 min' },
        { id: '2', client: 'Thomas Dubreuil', type: 'Facture', amount: '89,50 €', rawAmount: 89.50, status: 'En attente', date: 'Il y a 15 min' },
        { id: '3', client: 'Marie Leroy', type: 'Devis', amount: '450,00 €', rawAmount: 450.00, status: 'Envoyé', date: 'Il y a 1h' },
        { id: '4', client: 'Lucas Petit', type: 'Commande', amount: '34,90 €', rawAmount: 34.90, status: 'Payé', date: 'Il y a 2h' },
        { id: '5', client: 'Julie Bernard', type: 'Support', amount: '-', rawAmount: 0, status: 'Résolu', date: 'Il y a 3h' },
    ]);

    // Simulation Logic
    useEffect(() => {
        const clients = ['Alice Dupont', 'Pierre Durand', 'Claire Petit', 'Marc Lefebvre', 'Julie Moreau'];

        const interval = setInterval(() => {
            const randomEvent = Math.random();

            if (randomEvent > 0.5) {
                // New Payment / Order
                const amount = Math.floor(20 + Math.random() * 300);
                const client = clients[Math.floor(Math.random() * clients.length)];
                const newOp: Operation = {
                    id: Date.now().toString(),
                    client: client,
                    type: 'Paiement',
                    amount: `${amount},00 €`,
                    rawAmount: amount,
                    status: 'Payé',
                    date: 'À l\'instant'
                };

                // Update State
                setRevenue(prev => prev + amount);
                setOperations(prev => [newOp, ...prev]);

                // Update active users slightly
                setStats(prev => ({
                    ...prev,
                    activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1
                }));

                // Notify
                addNotification({
                    title: 'Paiement Reçu',
                    message: `Paiement de ${amount},00 € reçu de ${client}`,
                    type: 'payment'
                });

            } else {
                // Stock Alert or Info
                if (Math.random() > 0.5) {
                    addNotification({
                        title: 'Alerte Stock',
                        message: 'Le stock de "Webcam HD" diminue rapidement',
                        type: 'stock'
                    });
                } else {
                    const newOp: Operation = {
                        id: Date.now().toString(),
                        client: clients[Math.floor(Math.random() * clients.length)],
                        type: 'Commande',
                        amount: 'En cours',
                        rawAmount: 0,
                        status: 'En attente',
                        date: 'À l\'instant'
                    };
                    setOperations(prev => [newOp, ...prev]);
                    addNotification({
                        title: 'Nouvelle Commande',
                        message: 'Une nouvelle commande est en attente de validation',
                        type: 'order'
                    });
                }
            }

        }, 15000); // Trigger every 15 seconds for demo purposes (faster than 2 mins to show effect)

        return () => clearInterval(interval);
    }, [addNotification]);

    return (
        <BusinessContext.Provider value={{ revenue, operations, stats }}>
            {children}
        </BusinessContext.Provider>
    );
};

export const useBusiness = () => {
    const context = useContext(BusinessContext);
    if (!context) throw new Error('useBusiness must be used within a BusinessProvider');
    return context;
};
