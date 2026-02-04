import { ReactNode } from 'react';

export const PageContainer = ({ title, children }: { title: string; children: ReactNode }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            {children}
        </div>
    );
};
