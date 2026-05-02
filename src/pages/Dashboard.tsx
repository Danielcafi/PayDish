/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  Monitor, 
  Settings, 
  ChevronRight, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Users, 
  Table as TableIcon, 
  CreditCard,
  LogOut,
  Bell,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { RESTAURANTS, MOCK_ORDERS } from '../data';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const restaurant = RESTAURANTS[0];
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="w-72 bg-brand-dark hidden lg:flex flex-col text-white">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-green p-1.5 rounded-lg">
              <QrCodeIcon className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">PayDish</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Vue d\'ensemble' },
            { id: 'orders', icon: ShoppingBag, label: 'Commandes', badge: '5' },
            { id: 'menu', icon: UtensilsCrossed, label: 'Menu' },
            { id: 'tables', icon: TableIcon, label: 'Tables & QR' },
            { id: 'payments', icon: CreditCard, label: 'Paiements' },
            { id: 'settings', icon: Settings, label: 'Paramètres' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === item.id ? 'bg-brand-green text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.badge && (
                <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === item.id ? 'bg-white text-brand-green' : 'bg-brand-green text-white'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center font-bold text-lg">A</div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold truncate">Adjoua Koffi</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate">Le Bon Goût</div>
            </div>
            <button className="text-gray-500 hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto w-full">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-gray-50/80 backdrop-blur-md px-4 sm:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-brand-dark">Bonjour, Adjoua !</h1>
            <p className="text-gray-500 text-sm font-medium">Samedi 2 Mai 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-white rounded-xl border border-gray-200 text-gray-400 relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full border-2 border-white"></div>
            </button>
            <button className="bg-brand-green text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-brand-green/20">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nouvelle commande</span>
            </button>
          </div>
        </header>

        <div className="px-4 sm:px-8 pb-8 space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: "Commandes aujourd'hui", value: "47", diff: "+12%", up: true, icon: ShoppingBag, color: "blue" },
                  { label: "Chiffre d'affaires", value: "385k", sub: "FCFA", diff: "+8%", up: true, icon: CreditCard, color: "brand-green" },
                  { label: "Ticket moyen", value: "8 191", sub: "FCFA", diff: "-3%", up: false, icon: Users, color: "purple" },
                  { label: "Tables actives", value: "12/15", diff: "80%", up: true, icon: TableIcon, color: "brand-orange" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-[28px] shadow-soft border border-gray-100 flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-brand-dark/5 text-brand-dark`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className={`flex items-center gap-0.5 text-xs font-bold ${stat.up ? 'text-brand-green' : 'text-red-500'}`}>
                        {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                        {stat.diff}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-brand-dark">{stat.value}</span>
                        {stat.sub && <span className="text-sm font-bold text-gray-400">{stat.sub}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts & Real-time Orders */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Real-time Orders List */}
                <div className="lg:col-span-2 bg-white rounded-[32px] shadow-soft border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-brand-dark">Commandes en temps réel</h3>
                      <p className="text-gray-400 text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> MISE À JOUR LIVE
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-brand-green/10 text-brand-green rounded-lg text-xs font-bold">Tout</button>
                      <button className="px-4 py-2 bg-gray-50 text-gray-400 rounded-lg text-xs font-bold">En préparation</button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {MOCK_ORDERS.map((order, i) => (
                      <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-xl text-brand-dark">
                            #{order.tableNumber}
                          </div>
                          <div>
                            <div className="font-black text-brand-dark flex items-center gap-2">
                              {order.items.length} articles 
                              <span className="text-gray-300">•</span>
                              <span className="text-brand-green">{order.total} FCFA</span>
                            </div>
                            <div className="text-xs text-gray-400 font-bold tracking-tight">
                              Commandé il y a 8 min <span className="text-gray-200">|</span> {order.id}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'preparing' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            {order.status === 'preparing' ? 'Préparation' : 'En attente'}
                          </span>
                          <button className="p-2.5 bg-gray-100 rounded-xl text-brand-dark hover:bg-brand-green hover:text-white transition-all">
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50/50 text-center">
                    <button className="text-sm font-bold text-brand-green hover:underline">Voir l'historique complet</button>
                  </div>
                </div>

                {/* Quick Actions / Activity */}
                <div className="space-y-6">
                  <div className="bg-brand-green rounded-[32px] p-8 text-white relative overflow-hidden">
                    <h3 className="text-xl font-black mb-2 relative z-10">Optimisez votre menu</h3>
                    <p className="text-white/70 text-sm mb-6 relative z-10 leading-relaxed">
                      "Atassi" est votre plat le plus commandé aujourd'hui. Pensez à le mettre en avant sur votre interface client !
                    </p>
                    <button className="bg-white text-brand-green px-6 py-3 rounded-xl font-black text-sm relative z-10 shadow-xl shadow-black/10">
                      Booster les ventes
                    </button>
                    <UtensilsCrossed className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 -rotate-12" />
                  </div>

                  <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 p-6">
                    <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-6">Activités récentes</h3>
                    <div className="space-y-6">
                      {[
                        { type: 'payment', text: 'Paiement de 12 500 FCFA reçu (Wave)', time: '2 min' },
                        { type: 'order', text: 'Nouvelle commande - Table 4', time: '15 min' },
                        { type: 'stock', text: 'Jus de Bissap marqué "Épuisé"', time: '1h' }
                      ].map((activity, i) => (
                        <div key={i} className="flex gap-4">
                          <div className={`w-2 h-2 rounded-full mt-1.5 ${activity.type === 'payment' ? 'bg-brand-green shadow-[0_0_8px_rgba(29,185,84,0.5)]' : 'bg-gray-300'}`}></div>
                          <div>
                            <p className="text-sm font-bold text-brand-dark">{activity.text}</p>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'menu' && (
             <div className="bg-white rounded-[32px] shadow-soft border border-gray-100 p-8">
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-black text-brand-dark">Gestion du Menu</h2>
                 <button className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                   <Plus className="w-5 h-5" /> Ajouter un plat
                 </button>
               </div>
               <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {restaurant.menu.map(item => (
                   <div key={item.id} className="border border-gray-100 rounded-2xl overflow-hidden group">
                     <div className="h-40 bg-gray-100 relative">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black">{item.price} FCFA</div>
                     </div>
                     <div className="p-4">
                       <h4 className="font-black text-brand-dark mb-1">{item.name}</h4>
                       <p className="text-xs text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-4 bg-brand-green rounded-full relative cursor-pointer">
                              <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                           </div>
                           <span className="text-[10px] font-black text-brand-green uppercase tracking-widest">En stock</span>
                         </div>
                         <button className="text-gray-300 hover:text-brand-dark transition-colors"><Settings className="w-4 h-4" /></button>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

function QrCodeIcon({ className }: { className?: string }) {
  return <QrCode className={className} />;
}
