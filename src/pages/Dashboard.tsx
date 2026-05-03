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
  Clock,
  QrCode,
  TrendingUp,
  MoreVertical
} from 'lucide-react';
import { RESTAURANTS, MOCK_ORDERS } from '../data';
import { Link } from 'react-router-dom';
import ThemeToggle from '../lib/ThemeToggle';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const restaurant = RESTAURANTS[0];
  
  return (
    <div className="min-h-screen bg-surface flex selection:bg-gold/30 selection:text-navy transition-colors duration-500">
      {/* Sidebar - Desktop */}
      <aside className="w-80 bg-navy dark:bg-card-bg hidden lg:flex flex-col text-white relative z-20 shadow-2xl transition-colors duration-500 border-r border-white/5 dark:border-border">
        <div className="p-12">
          <Link to="/" className="flex flex-col gap-4 group">
            <img src="/logo.png" alt="PayDish Logo" className="h-20 w-auto group-hover:scale-105 transition-transform" />
            <span className="text-3xl font-black tracking-tighter text-white">PayDish</span>
          </Link>
        </div>

        <nav className="flex-1 px-8 space-y-3 mt-4">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Vue d\'ensemble' },
            { id: 'orders', icon: ShoppingBag, label: 'Commandes', badge: '5' },
            { id: 'menu', icon: UtensilsCrossed, label: 'Menu Digital' },
            { id: 'tables', icon: TableIcon, label: 'Tables & QR' },
            { id: 'payments', icon: CreditCard, label: 'Transactions' },
            { id: 'settings', icon: Settings, label: 'Paramètres' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-300 font-black text-xs uppercase tracking-widest ${
                activeTab === item.id 
                ? 'bg-gold text-navy shadow-lg shadow-gold/20' 
                : 'text-white/40 hover:text-white hover:bg-white/5 dark:text-ink-muted dark:hover:text-gold'
              }`}
            >
              <item.icon size={20} />
              {item.label}
              {item.badge && (
                <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === item.id ? 'bg-navy text-white' : 'bg-gold text-navy'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
          <div className="bg-white/5 dark:bg-surface-2 border border-white/10 dark:border-border p-6 rounded-[2rem] flex items-center gap-4">
            <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center font-black text-navy shadow-xl">A</div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-black truncate text-white dark:text-ink">Adjoua Koffi</div>
              <div className="text-[10px] text-white/30 dark:text-ink-muted font-black uppercase tracking-widest truncate">Le Bon Goût</div>
            </div>
            <button className="text-white/20 hover:text-danger transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto w-full relative z-10 custom-scrollbar bg-surface transition-colors duration-500">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl px-12 py-8 flex items-center justify-between border-b border-border transition-colors duration-500">
          <div>
            <h1 className="text-3xl font-black text-ink tracking-tighter">Tableau de bord</h1>
            <p className="text-ink-muted text-[10px] font-black uppercase tracking-[0.3em] mt-1">Samedi 2 Mai 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="w-[1px] h-8 bg-border mx-2"></div>
            <button className="p-4 bg-card-bg rounded-2xl border border-border text-ink-muted relative hover:text-gold transition-colors shadow-sm">
              <Bell size={22} />
              <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-surface"></div>
            </button>
            <button className="btn-gold px-8 py-4 rounded-2xl flex items-center gap-3">
              <Plus size={20} />
              NOUVELLE COMMANDE
            </button>
          </div>
        </header>

        <div className="px-12 pb-16 space-y-12">
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">
                {[
                  { label: "Ventes jour", value: "47", diff: "+12%", up: true, icon: ShoppingBag },
                  { label: "Chiffre d'affaires", value: "385k", diff: "+8%", up: true, icon: TrendingUp },
                  { label: "Clientèle", value: "112", diff: "-3%", up: false, icon: Users },
                  { label: "Taux d'occupation", value: "82%", diff: "+5%", up: true, icon: TableIcon }
                ].map((stat, i) => (
                  <div key={i} className="card-premium hover-lift border-none shadow-xl bg-card-bg">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-surface-2 flex items-center justify-center text-gold border border-border">
                        <stat.icon size={28} />
                      </div>
                      <div className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${stat.up ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                        {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                        {stat.diff}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-ink-muted uppercase tracking-[0.3em] mb-3">{stat.label}</h4>
                      <div className="text-4xl font-black text-ink tracking-tighter">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid xl:grid-cols-3 gap-12">
                {/* Orders Feed */}
                <div className="xl:col-span-2 card-premium border-none shadow-2xl overflow-hidden bg-card-bg">
                  <div className="p-10 border-b border-border flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-ink tracking-tight">Commandes en direct</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="live-indicator"></div>
                        <p className="text-[10px] text-ink-muted font-black uppercase tracking-[0.2em]">Mise à jour en temps réel</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-black text-gold uppercase tracking-[0.2em] border-b-2 border-gold/30 hover:border-gold transition-all">Voir tout l'historique</button>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {MOCK_ORDERS.map((order, i) => (
                      <div key={i} className="p-10 flex items-center gap-10 hover:bg-surface-2/50 transition-all group">
                        <div className="w-20 h-20 bg-navy dark:bg-surface-2 text-gold rounded-[2rem] flex flex-col items-center justify-center font-black transition-all group-hover:scale-105 border border-border shadow-lg">
                          <span className="text-[10px] opacity-40 uppercase tracking-tighter">Table</span>
                          <span className="text-3xl mt-[-4px]">{order.tableNumber}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h5 className="text-lg font-black text-ink tracking-tight">{order.items.length} Articles</h5>
                            <span className="text-ink-muted opacity-20">|</span>
                            <span className="font-black text-gold text-lg tracking-tight">{order.total.toLocaleString()} FCFA</span>
                          </div>
                          <p className="text-xs font-bold text-ink-muted uppercase tracking-widest">ID: #PAY-{order.id.split('-')[1]} • 8 min ago</p>
                        </div>

                        <div className="flex items-center gap-6">
                          <span className={`badge uppercase px-6 py-2 ${
                            order.status === 'preparing' ? 'badge-gold' : 'badge-navy'
                          }`}>
                            {order.status === 'preparing' ? 'En Préparation' : 'En Attente'}
                          </span>
                          <button className="w-12 h-12 rounded-2xl bg-surface-2 border border-border flex items-center justify-center text-ink-muted hover:text-gold transition-all">
                            <CheckCircle2 size={24} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Insights */}
                <div className="space-y-12">
                  <div className="hero-gradient p-12 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
                    <div className="relative z-10">
                      <div className="bg-gold w-14 h-14 rounded-2xl flex items-center justify-center text-navy mb-8 group-hover:scale-110 transition-transform shadow-xl">
                        <Sparkles size={28} />
                      </div>
                      <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">Insight PayDish AI</h3>
                      <p className="text-white/60 text-sm font-medium mb-10 leading-relaxed">
                        Le plat <span className="text-gold font-bold">"Atassi Royale"</span> performe 40% mieux que d'habitude. Pensez à augmenter le stock pour ce soir.
                      </p>
                      <button className="w-full bg-white text-navy py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-gold transition-colors">
                        Optimiser le stock
                      </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
                  </div>

                  <div className="card-premium bg-card-bg border-none shadow-2xl">
                    <h3 className="text-[11px] font-black text-ink-muted uppercase tracking-[0.3em] mb-10">Activité Récente</h3>
                    <div className="space-y-10">
                      {[
                        { icon: CreditCard, text: 'Paiement Wave - Table 4', amount: '+12.500', time: 'Juste maintenant', color: 'gold' },
                        { icon: ShoppingBag, text: 'Nouvelle commande - Table 1', amount: '+8.200', time: '12 min', color: 'ink' },
                        { icon: TableIcon, text: 'Table 7 libre', amount: null, time: '1h', color: 'ink-muted' }
                      ].map((activity, i) => (
                        <div key={i} className="flex gap-6 group cursor-default">
                          <div className={`w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center border border-border group-hover:border-gold transition-colors ${activity.color === 'gold' ? 'text-gold' : 'text-ink-muted'}`}>
                            <activity.icon size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-sm font-black text-ink tracking-tight">{activity.text}</p>
                              {activity.amount && <span className="text-xs font-black text-gold">{activity.amount}</span>}
                            </div>
                            <span className="text-[10px] font-black text-ink-muted uppercase tracking-[0.2em]">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
