/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Shield, LayoutDashboard, Store, Users, DollarSign, Activity, Search, Filter, MoreHorizontal, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('restaurants');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-brand-dark text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="PayDish Logo" className="h-10 w-auto" />
          <h1 className="text-xl font-black">PayDish Super Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-gray-400">ADMIN: DANIEL K.</span>
          <Link to="/" className="text-xs font-bold hover:text-brand-green">Quitter</Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 p-4 space-y-2 hidden md:block">
           {[
             { id: 'stats', label: 'Vue Globale', icon: LayoutDashboard },
             { id: 'restaurants', label: 'Restaurants', icon: Store },
             { id: 'users', label: 'Utilisateurs', icon: Users },
             { id: 'revenue', label: 'Revenus', icon: DollarSign },
             { id: 'logs', label: 'Logs Système', icon: Activity },
           ].map(item => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === item.id ? 'bg-gray-100 text-brand-dark' : 'text-gray-400 hover:bg-gray-50'}`}
             >
               <item.icon className="w-5 h-5" />
               {item.label}
             </button>
           ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
           {activeTab === 'restaurants' && (
             <section className="space-y-8">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <h2 className="text-2xl font-black text-brand-dark">Tous les Restaurants</h2>
                 <div className="flex gap-2">
                   <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                     <input type="text" placeholder="Rechercher..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-green" />
                   </div>
                   <button className="p-2 bg-white border border-gray-200 rounded-lg"><Filter className="w-5 h-5 text-gray-500" /></button>
                 </div>
               </div>

               <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-gray-50 border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <tr>
                       <th className="px-6 py-4">Restaurant</th>
                       <th className="px-6 py-4">Gérant</th>
                       <th className="px-6 py-4">Abonnement</th>
                       <th className="px-6 py-4">Volume (FCFA)</th>
                       <th className="px-6 py-4">Statut</th>
                       <th className="px-6 py-4">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 italic font-medium">
                     {[
                       { name: 'Le Bon Goût', manager: 'Adjoua K.', plan: 'Pro', revenue: '3.2M', status: 'Actif' },
                       { name: 'Maquis du Port', manager: 'Koffi P.', plan: 'Gratuit', revenue: '1.2M', status: 'Actif' },
                       { name: 'Sika FastFood', manager: 'Sika T.', plan: 'Restaurant+', revenue: '8.5M', status: 'Actif' },
                       { name: 'Le Repos du Guerrier', manager: 'Femi O.', plan: 'Pro', revenue: '540k', status: 'Suspendu' },
                     ].map((r, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition-colors">
                         <td className="px-6 py-4">
                           <div className="font-black text-brand-dark not-italic">{r.name}</div>
                           <div className="text-[10px] text-gray-400">Cotonou, Bénin</div>
                         </td>
                         <td className="px-6 py-4 text-sm">{r.manager}</td>
                         <td className="px-6 py-4">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.plan === 'Pro' ? 'bg-blue-100 text-blue-600' : r.plan === 'Restaurant+' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                             {r.plan}
                           </span>
                         </td>
                         <td className="px-6 py-4 text-sm font-bold text-brand-dark not-italic">{r.revenue}</td>
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              {r.status === 'Actif' ? <CheckCircle2 className="w-4 h-4 text-brand-green" /> : <XCircle className="w-4 h-4 text-red-500" />}
                              <span className="text-xs">{r.status}</span>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                           <button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-5 h-5 text-gray-400" /></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </section>
           )}

           {activeTab === 'stats' && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-8 rounded-3xl border border-gray-200">
                 <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Restaurants</div>
                 <div className="text-4xl font-black">214</div>
               </div>
               <div className="bg-white p-8 rounded-3xl border border-gray-200">
                 <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Commandes Totales</div>
                 <div className="text-4xl font-black">15,482</div>
               </div>
               <div className="bg-white p-8 rounded-3xl border border-gray-200">
                 <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Volume Traité</div>
                 <div className="text-4xl font-black text-brand-green">142M <span className="text-sm font-bold text-gray-400 tracking-tight">FCFA</span></div>
               </div>
             </div>
           )}
        </main>
      </div>
    </div>
  );
}
