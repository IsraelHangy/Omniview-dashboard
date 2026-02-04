import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export const Header = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const section = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(section);
    }, []);

    return (
        <header className="h-16 bg-white/50 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent hidden md:block">
                    Omniview
                </h1>
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-medium text-green-700">Synchro Live</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all outline-none"
                    />
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-700">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                        {time.toLocaleDateString('fr-FR', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                </div>

                <div className="relative group">
                    <button className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs ring-2 ring-white shadow-sm hover:ring-primary-100 transition-all">
                        JD
                    </button>

                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                        <div className="px-4 py-3 border-b border-slate-50">
                            <p className="text-sm font-bold text-slate-800">Jean Dupont</p>
                            <p className="text-xs text-slate-500">Administrateur</p>
                        </div>
                        <a href="#/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            Mon Profil
                        </a>
                        <a href="#/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            Paramètres
                        </a>
                        <div className="border-t border-slate-50 mt-1">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
