import { PageContainer } from '../components/PageContainer';
import { ActivityChart } from '../components/ActivityChart';
import { ArrowUpRight, TrendingUp, Users, ShoppingCart, Download } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useToast } from '../context/ToastContext';

export const Analytics = () => {
    const location = useLocation();
    const { showToast } = useToast();

    useEffect(() => {
        if (location.search.includes('section=insights')) {
            const element = document.getElementById('insights');
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Highlight effect
                    element.classList.add('ring-2', 'ring-primary-500', 'ring-offset-4');
                    setTimeout(() => element.classList.remove('ring-2', 'ring-primary-500', 'ring-offset-4'), 2000);
                }, 100);
            }
        }
    }, [location]);

    const handleExport = () => {
        // Simulation of file download
        showToast('Le rapport complet (PDF) a été téléchargé.', 'success');

        // Simulating a real download link click for UI feedback
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'Omniview_Rapport_2023.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <PageContainer title="Analytique">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <p className="text-slate-500">Vue d'ensemble des performances de votre entreprise.</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-primary-600 transition-colors shadow-sm"
                >
                    <Download className="h-4 w-4" />
                    <span>Exporter le rapport</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Croissance</p>
                            <h3 className="text-2xl font-bold text-slate-800">+24.5%</h3>
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-green-600 font-medium">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span>vs mois dernier</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Nouveaux Clients</p>
                            <h3 className="text-2xl font-bold text-slate-800">64</h3>
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-green-600 font-medium">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span>+12% cette semaine</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                            <ShoppingCart className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Panier Moyen</p>
                            <h3 className="text-2xl font-bold text-slate-800">85,20 €</h3>
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-red-600 font-medium">
                        <ArrowUpRight className="h-4 w-4 mr-1 rotate-90" />
                        <span>-2.1% vs hier</span>
                    </div>
                </div>
            </div>

            <ActivityChart />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Produits les plus vendus</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-slate-200 rounded-lg"></div>
                                    <div>
                                        <p className="font-medium text-slate-800">Produit Premium #{i}</p>
                                        <p className="text-sm text-slate-500">ELECTRONIQUE</p>
                                    </div>
                                </div>
                                <span className="font-bold text-slate-800">1,240 €</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Répartition par région</h3>
                    <div className="space-y-4">
                        {['Europe', 'Amérique du Nord', 'Asie'].map((region, i) => (
                            <div key={region} className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="font-medium text-sm text-slate-800">{region}</div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-primary-600">{60 - i * 15}%</span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-100">
                                    <div style={{ width: `${60 - i * 15}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Insights Section */}
            <div id="insights" className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        <TrendingUp className="h-6 w-6 text-primary-300" />
                    </div>
                    <h2 className="text-2xl font-bold">Insights Stratégiques</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary-100">Top Clients à Fidéliser</h3>
                        <div className="space-y-3">
                            {['Sophie Martin', 'Jean Dupont', 'Marie Leroy'].map((client, i) => (
                                <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-xs font-bold">
                                            {client.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span>{client}</span>
                                    </div>
                                    <span className="text-primary-300 font-mono text-sm">Top {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary-100">Recommandations IA</h3>
                        <div className="space-y-4">
                            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                                <p className="text-sm font-medium text-green-300 mb-1">👍 Opportunité de Vente</p>
                                <p className="text-sm text-slate-300">Le produit "Casque Audio" est en forte demande (+45%). Envisagez une promotion flash.</p>
                            </div>
                            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl">
                                <p className="text-sm font-medium text-orange-300 mb-1">⚠️ Attention Stock</p>
                                <p className="text-sm text-slate-300">Réapprovisionnez les "Webcam HD" avant vendredi pour éviter une rupture.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
