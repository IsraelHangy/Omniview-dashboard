import { KPIGrid } from '../components/KPIGrid';
import { ActivityChart } from '../components/ActivityChart';
import { RecentActivityTable } from '../components/RecentActivityTable';
import { QuickActions } from '../components/QuickActions';
import { PageContainer } from '../components/PageContainer';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <PageContainer title="Tableau de Bord">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                <motion.div variants={itemVariants}>
                    <KPIGrid />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <ActivityChart />
                    </motion.div>
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white h-full flex flex-col justify-between shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                            <div>
                                <h3 className="text-xl font-bold mb-2">Conseil Pro</h3>
                                <p className="text-primary-100 text-sm leading-relaxed">
                                    Vos revenus récurrents ont augmenté de 12% cette semaine. N'oubliez pas de remercier vos meilleurs clients.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate('/analytics?section=insights')}
                                className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm self-start px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Voir les Insights
                            </button>
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                    <RecentActivityTable />
                </motion.div>
            </motion.div>

            <QuickActions />
        </PageContainer>
    );
};
