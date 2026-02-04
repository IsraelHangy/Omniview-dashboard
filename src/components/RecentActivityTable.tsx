import { MoreHorizontal, FileText, Send } from 'lucide-react';
import { useState } from 'react';
import { Modal } from './Modal';
import { useToast } from '../context/ToastContext';
import { useBusiness } from '../context/BusinessContext';

export const RecentActivityTable = () => {
    const { showToast } = useToast();
    const { operations } = useBusiness(); // Use shared operations

    const [selectedOp, setSelectedOp] = useState<any>(null);
    const [modalMode, setModalMode] = useState<'details' | 'thanks' | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const handleAction = (op: any, mode: 'details' | 'thanks') => {
        setSelectedOp(op);
        setModalMode(mode);
        setOpenMenuId(null);
    };

    const handleSendThanks = () => {
        showToast(`Email de remerciement envoyé à ${selectedOp.client} !`, 'success');
        setModalMode(null);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[400px]">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Opérations Récentes</h3>
                <button className="text-sm text-primary-600 font-medium hover:text-primary-700">Voir tout</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Montant</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {operations.map((activity) => (
                            <tr key={activity.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-slate-900">{activity.client}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {activity.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                    {activity.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${activity.status === 'Payé' || activity.status === 'Résolu' ? 'bg-green-50 text-green-700 border-green-100' :
                                            activity.status === 'En attente' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                'bg-blue-50 text-blue-700 border-blue-100'
                                        }`}>
                                        {activity.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                    {activity.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === activity.id ? null : activity.id)}
                                        className={`p-2 rounded-lg transition-colors ${openMenuId === activity.id ? 'bg-slate-100 text-slate-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>

                                    {openMenuId === activity.id && (
                                        <div className="absolute right-8 top-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-10 text-left animate-in fade-in zoom-in-95 duration-200">
                                            <button
                                                onClick={() => handleAction(activity, 'details')}
                                                className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                            >
                                                <FileText className="h-4 w-4 text-slate-400" />
                                                Voir les détails
                                            </button>
                                            <button
                                                onClick={() => handleAction(activity, 'thanks')}
                                                className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                            >
                                                <Send className="h-4 w-4 text-slate-400" />
                                                Remercier le client
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {openMenuId && (
                <div className="fixed inset-0 z-0" onClick={() => setOpenMenuId(null)}></div>
            )}

            <Modal
                isOpen={modalMode === 'details'}
                onClose={() => setModalMode(null)}
                title="Détails de l'opération"
            >
                {selectedOp && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Montant Total</p>
                                <p className="text-2xl font-bold text-slate-800">{selectedOp.amount}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 uppercase">Statut</p>
                                <p className="font-medium text-green-600">{selectedOp.status}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-500">Client</span>
                                <span className="font-medium">{selectedOp.client}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-500">Type</span>
                                <span className="font-medium">{selectedOp.type}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-500">Date</span>
                                <span className="font-medium">{selectedOp.date}</span>
                            </div>
                            <div className="flex justify-between pb-2">
                                <span className="text-slate-500">ID Transaction</span>
                                <span className="font-medium text-xs font-mono bg-slate-100 px-2 py-1 rounded">#{selectedOp.id}8293X</span>
                            </div>
                        </div>
                        <button onClick={() => setModalMode(null)} className="w-full bg-slate-100 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                            Fermer
                        </button>
                    </div>
                )}
            </Modal>

            <Modal
                isOpen={modalMode === 'thanks'}
                onClose={() => setModalMode(null)}
                title="Remercier le client"
            >
                {selectedOp && (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500">Envoyez un email personnalisé pour remercier ce client de sa fidélité.</p>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Message</label>
                            <textarea
                                rows={4}
                                className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
                                defaultValue={`Bonjour ${selectedOp.client.split(' ')[0]},\n\nMerci pour votre récente opération de ${selectedOp.amount}. Nous apprécions votre confiance !\n\nCordialement,\nL'équipe Omniview`}
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setModalMode(null)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">
                                Annuler
                            </button>
                            <button onClick={handleSendThanks} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20">
                                <Send className="h-4 w-4" />
                                Envoyer
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
