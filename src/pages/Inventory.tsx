import { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Modal } from '../components/Modal';
import { useToast } from '../context/ToastContext';

export const Inventory = () => {
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([
        { id: 1, name: 'Casque Audio Pro', sku: 'AUDIO-001', stock: 45, price: '129,99 €', status: 'En Stock' },
        { id: 2, name: 'Clavier Mécanique', sku: 'TECH-042', stock: 12, price: '89,99 €', status: 'Faible' },
        { id: 3, name: 'Moniteur 4K', sku: 'SCREEN-099', stock: 0, price: '349,99 €', status: 'Rupture' },
        { id: 4, name: 'Souris Ergonomique', sku: 'TECH-012', stock: 88, price: '49,99 €', status: 'En Stock' },
        { id: 5, name: 'Webcam HD', sku: 'CAM-005', stock: 24, price: '79,99 €', status: 'En Stock' },
    ]);

    const [newProduct, setNewProduct] = useState({ name: '', sku: '', stock: 0, price: '' });

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        setProducts([...products, { ...newProduct, id: Date.now(), status: newProduct.stock > 0 ? 'En Stock' : 'Rupture' }]);
        showToast('Produit ajouté avec succès !', 'success');
        setIsModalOpen(false);
        setNewProduct({ name: '', sku: '', stock: 0, price: '' });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'En Stock': return 'bg-green-100 text-green-700';
            case 'Faible': return 'bg-orange-100 text-orange-700';
            case 'Rupture': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <PageContainer title="Inventaire">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="pl-10 pr-4 py-2 w-full bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">
                            <Filter className="h-4 w-4" />
                            <span>Filtres</span>
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Ajouter un produit</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nom du Produit</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Prix</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-slate-900">{product.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {product.sku}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {product.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ajouter un Produit">
                <form onSubmit={handleAddProduct} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Nom du Produit</label>
                        <input required type="text" className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 outline-none"
                            value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">SKU</label>
                        <input required type="text" className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 outline-none"
                            value={newProduct.sku} onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Stock</label>
                            <input required type="number" className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 outline-none"
                                value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })} />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Prix</label>
                            <input required type="text" placeholder="ex: 19,99 €" className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500/20 outline-none"
                                value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Annuler</button>
                        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">Ajouter</button>
                    </div>
                </form>
            </Modal>
        </PageContainer>
    );
};
