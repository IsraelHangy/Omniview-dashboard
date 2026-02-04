import { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { User, Bell, Lock, Globe, Palette, Database, Save } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Settings = () => {
    const [activeTab, setActiveTab] = useState('Profil');
    const { showToast } = useToast();

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Vos paramètres ont été sauvegardés avec succès.', 'success');
    };

    return (
        <PageContainer title="Paramètres">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Settings Sidebar */}
                <div className="w-full md:w-64 space-y-2">
                    {[
                        { icon: User, label: 'Profil' },
                        { icon: Bell, label: 'Notifications' },
                        { icon: Lock, label: 'Sécurité' },
                        { icon: Globe, label: 'Langue & Région' },
                        { icon: Palette, label: 'Apparence' },
                        { icon: Database, label: 'Données' },
                    ].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => setActiveTab(item.label)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.label
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                    <div className="mb-8 border-b border-slate-100 pb-4">
                        <h3 className="text-xl font-bold text-slate-800">{activeTab}</h3>
                        <p className="text-slate-500 text-sm">Gérez vos préférences pour {activeTab.toLowerCase()}.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSave}>
                        {activeTab === 'Profil' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Prénom</label>
                                        <input
                                            type="text"
                                            defaultValue="Jean"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Nom</label>
                                        <input
                                            type="text"
                                            defaultValue="Dupont"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Adresse Email</label>
                                        <input
                                            type="email"
                                            defaultValue="jean.dupont@omniview.com"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Téléphone</label>
                                        <input
                                            type="tel"
                                            defaultValue="+33 6 12 34 56 78"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Rôle</label>
                                    <input
                                        type="text"
                                        value="Administrateur"
                                        disabled
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                            </>
                        )}

                        {activeTab !== 'Profil' && (
                            <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                                <div className="p-4 bg-slate-50 rounded-full mb-4">
                                    <SettingsIcon className="h-8 w-8" />
                                </div>
                                <p>Options de configuration pour {activeTab}.</p>
                                <p className="text-xs mt-2">Fonctionnalité complète bientôt disponible.</p>
                            </div>
                        )}

                        <div className="pt-6 border-t border-slate-100 flex justify-end">
                            <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 active:scale-95">
                                <Save className="h-4 w-4" />
                                Sauvegarder les modifications
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PageContainer>
    );
};

// Helper icon
const SettingsIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
