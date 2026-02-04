import { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Mail, Phone, MoreVertical, Plus } from 'lucide-react';
import { Modal } from '../components/Modal';
import { useToast } from '../context/ToastContext';

export const Team = () => {
    const { showToast } = useToast();
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [activeCall, setActiveCall] = useState<string | null>(null);

    const [members, setMembers] = useState([
        { id: 1, name: 'Alice Martin', role: 'Manager', email: 'alice@omniview.com', status: 'En ligne', avatar: 'AM' },
        { id: 2, name: 'Thomas Dubreuil', role: 'Support Client', email: 'thomas@omniview.com', status: 'Occupé', avatar: 'TD' },
        { id: 3, name: 'Sophie Bernard', role: 'Commercial', email: 'sophie@omniview.com', status: 'Hors ligne', avatar: 'SB' },
        { id: 4, name: 'Lucas Petit', role: 'Développeur', email: 'lucas@omniview.com', status: 'En ligne', avatar: 'LP' },
    ]);

    const [newMember, setNewMember] = useState({ name: '', role: '', email: '' });

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        const initials = newMember.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        setMembers([...members, { ...newMember, id: Date.now(), status: 'Hors ligne', avatar: initials }]);
        showToast(`Invitation envoyée à ${newMember.email}`, 'success');
        setIsInviteOpen(false);
        setNewMember({ name: '', role: '', email: '' });
    };

    const startCall = (name: string) => {
        setActiveCall(name);
        setTimeout(() => setActiveCall(null), 3000); // Simulate short call ui
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'En ligne': return 'bg-green-500';
            case 'Occupé': return 'bg-orange-500';
            case 'Hors ligne': return 'bg-slate-300';
            default: return 'bg-slate-300';
        }
    };

    return (
        <PageContainer title="Équipe">
            <div className="flex justify-between items-center mb-6">
                <p className="text-slate-500">Gérez les membres de votre équipe et leurs permissions.</p>
                <button
                    onClick={() => setIsInviteOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                >
                    <Plus className="h-4 w-4" />
                    <span>Inviter un membre</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
                        <button className="absolute top-4 right-4 text-slate-300 hover:text-slate-600">
                            <MoreVertical className="h-5 w-5" />
                        </button>
                        <div className="relative mb-4">
                            <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold">
                                {member.avatar}
                            </div>
                            <div className={`absolute bottom-0 right-1 h-5 w-5 border-2 border-white rounded-full ${getStatusColor(member.status)}`}></div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">{member.name}</h3>
                        <p className="text-primary-600 font-medium text-sm mb-4">{member.role}</p>

                        <div className="flex gap-2 w-full mt-2">
                            <a href={`mailto:${member.email}`} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium hover:bg-slate-100 transition-colors">
                                <Mail className="h-4 w-4" />
                                Email
                            </a>
                            <button
                                onClick={() => startCall(member.name)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium hover:bg-slate-100 transition-colors"
                            >
                                <Phone className="h-4 w-4" />
                                Appeler
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} title="Inviter un membre">
                <form onSubmit={handleInvite} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Nom Complet</label>
                        <input required type="text" className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 outline-none"
                            value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <input required type="email" className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 outline-none"
                            value={newMember.email} onChange={e => setNewMember({ ...newMember, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Rôle</label>
                        <select required className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 outline-none bg-white"
                            value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })}>
                            <option value="">Sélectionner un rôle</option>
                            <option value="Manager">Manager</option>
                            <option value="Développeur">Développeur</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Support">Support</option>
                        </select>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsInviteOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Annuler</button>
                        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Envoyer l'invitation</button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={!!activeCall} onClose={() => setActiveCall(null)} title="Appel en cours">
                <div className="flex flex-col items-center py-8">
                    <div className="h-24 w-24 bg-primary-50 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <Phone className="h-10 w-10 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{activeCall}</h3>
                    <p className="text-slate-500">Sonnerie en cours...</p>
                </div>
                <div className="flex justify-center">
                    <button onClick={() => setActiveCall(null)} className="bg-red-500 text-white px-8 py-3 rounded-full font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">
                        Raccrocher
                    </button>
                </div>
            </Modal>
        </PageContainer>
    );
};
