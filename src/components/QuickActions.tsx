import { Plus, Download, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export const QuickActions = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleExport = () => {
        setIsOpen(false);
        showToast('Le rapport complet (PDF) a été téléchargé.', 'success');

        // Simulating a real download link click for UI feedback
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'Omniview_Rapport_2023.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleTeamMessage = () => {
        setIsOpen(false);
        navigate('/team');
        setTimeout(() => {
            showToast('Redirection vers la messagerie d\'équipe...', 'info');
        }, 300);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col gap-3 items-end mb-2"
                    >
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 text-slate-700 hover:text-primary-600 font-medium transition-colors whitespace-nowrap group"
                        >
                            <span className="text-sm">Exporter un Rapport</span>
                            <div className="bg-slate-100 p-2 rounded-full group-hover:bg-primary-50 transition-colors">
                                <Download className="h-4 w-4" />
                            </div>
                        </button>
                        <button
                            onClick={handleTeamMessage}
                            className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 text-slate-700 hover:text-primary-600 font-medium transition-colors whitespace-nowrap group"
                        >
                            <span className="text-sm">Message Équipe</span>
                            <div className="bg-slate-100 p-2 rounded-full group-hover:bg-primary-50 transition-colors">
                                <MessageSquare className="h-4 w-4" />
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-16 w-16 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-slate-800 rotate-45' : 'bg-primary-600 hover:scale-105'
                    }`}
            >
                <Plus className="h-8 w-8 text-white" />
            </button>
        </div>
    );
};
