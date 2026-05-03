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
  MoreVertical,
  Sparkles,
  Filter,
  Trash2,
  Edit3,
  Globe,
  Share2,
  ChevronDown,
  MapPin
} from 'lucide-react';
import { RESTAURANTS, MOCK_ORDERS } from '../data';
import { Link } from 'react-router-dom';
import ThemeToggle from '../lib/ThemeToggle';
import { AnimatePresence } from 'motion/react';

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
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* Graph & Stats Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 mt-12">
                   {/* Enterprise Multi-Metric Graph Card */}
                   <div className="xl:col-span-2 card-premium bg-card-bg border-none shadow-2xl p-12 overflow-hidden relative group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 relative z-10">
                         <div className="flex items-center gap-12">
                            <div className="cursor-pointer group/stat">
                               <div className="text-[10px] text-ink-muted font-black uppercase tracking-[0.2em] mb-2 group-hover/stat:text-gold transition-colors">Revenus Totaux</div>
                               <div className="text-3xl font-black text-ink tracking-tighter">385,000 <span className="text-xs text-ink-muted font-bold">FCFA</span></div>
                            </div>
                            <div className="w-[1px] h-10 bg-border"></div>
                            <div className="cursor-pointer group/stat">
                               <div className="text-[10px] text-ink-muted font-black uppercase tracking-[0.2em] mb-2 group-hover/stat:text-blue-400 transition-colors">Nouv. Clients</div>
                               <div className="text-3xl font-black text-ink tracking-tighter">112</div>
                            </div>
                            <div className="w-[1px] h-10 bg-border"></div>
                            <div className="cursor-pointer group/stat">
                               <div className="text-[10px] text-ink-muted font-black uppercase tracking-[0.2em] mb-2 group-hover/stat:text-ink transition-colors">Commandes</div>
                               <div className="text-3xl font-black text-ink tracking-tighter">47</div>
                            </div>
                         </div>
                         
                         <div className="flex bg-surface-2 p-1 rounded-xl">
                            <button className="px-6 py-2 bg-card-bg rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">7 Jours</button>
                            <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-ink-muted hover:text-ink">30 Jours</button>
                         </div>
                      </div>

                      <div className="relative h-80 w-full flex gap-8">
                         {/* Primary Y-Axis (Currency) */}
                         <div className="flex flex-col justify-between text-[9px] font-black text-ink-muted uppercase tracking-widest pb-10 pt-2 w-10 text-right">
                            <span>400k</span>
                            <span>300k</span>
                            <span>200k</span>
                            <span>100k</span>
                            <span>0</span>
                         </div>

                         <div className="flex-1 relative">
                            {/* SVG Graph Component */}
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                               {/* Horizontal Grid Lines */}
                               {[0, 50, 100, 150, 200].map((y) => (
                                 <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" />
                               ))}
                               
                               <defs>
                                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.1" />
                                     <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                                  </linearGradient>
                               </defs>

                               {/* Commandes (Bars) - Visualized as subtle background bars */}
                               {[50, 150, 250, 350, 450, 550, 650, 750, 850, 950].map((x, i) => (
                                 <rect key={i} x={x-15} y={100 + (Math.random() * 80)} width="30" height="100" fill="currentColor" fillOpacity="0.03" rx="4" />
                               ))}

                               {/* Nouveaux Clients (Secondary Line) */}
                               <path
                                  d="M0,180 C100,160 200,170 300,140 C400,150 500,120 600,130 C700,110 800,120 900,90 L1000,100"
                                  fill="none"
                                  stroke="#3B82F6"
                                  strokeOpacity="0.3"
                                  strokeWidth="2"
                               />

                               {/* Revenus (Primary Line Area) */}
                               <path
                                  d="M0,150 C80,145 150,170 220,120 C300,60 380,130 460,100 C540,70 620,120 700,60 C780,0 880,50 1000,30 L1000,200 L0,200 Z"
                                  fill="url(#revenueGradient)"
                                />

                               {/* Revenus (Primary Line) */}
                               <motion.path
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                  d="M0,150 C80,145 150,170 220,120 C300,60 380,130 460,100 C540,70 620,120 700,60 C780,0 880,50 1000,30"
                                  fill="none"
                                  stroke="#C9A84C"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                               />

                               {/* Top Data Point Marker */}
                               <g className="filter drop-shadow-lg">
                                  <circle cx="1000" cy="30" r="6" fill="#1B3A6B" stroke="#C9A84C" strokeWidth="3" />
                               </g>
                            </svg>

                            <div className="flex justify-between mt-10 text-[9px] font-black text-ink-muted uppercase tracking-[0.4em]">
                               <span>26 Avr</span>
                               <span>27 Avr</span>
                               <span>28 Avr</span>
                               <span>29 Avr</span>
                               <span>30 Avr</span>
                               <span>01 Mai</span>
                               <span>02 Mai</span>
                            </div>
                         </div>

                         {/* Secondary Y-Axis (Counts for Users/Orders) */}
                         <div className="flex flex-col justify-between text-[9px] font-black text-ink-muted uppercase tracking-widest pb-10 pt-2 w-8">
                            <span className="text-blue-400">150</span>
                            <span className="text-blue-400">100</span>
                            <span className="text-blue-400">50</span>
                            <span className="text-blue-400">25</span>
                            <span className="text-blue-400 text-opacity-40">Clients</span>
                         </div>
                      </div>
                   </div>

                   {/* Insight Summary Side-Card */}
                   <div className="space-y-8">
                      <div className="hero-gradient p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[220px]">
                         <div className="relative z-10">
                            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                               <Sparkles size={24}/>
                            </div>
                            <h4 className="text-lg font-black tracking-tight mb-2">Objectif Mensuel</h4>
                            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">85% Complété</p>
                         </div>
                         <div className="relative z-10 w-full bg-white/10 h-2 rounded-full overflow-hidden mt-8">
                            <div className="h-full bg-gold w-[85%]"></div>
                         </div>
                         <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
                      </div>
                      
                      <div className="card-premium bg-card-bg border-none shadow-xl p-10">
                         <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 bg-success/10 text-success rounded-2xl flex items-center justify-center"><TrendingUp size={24}/></div>
                            <div className="text-right">
                               <div className="text-[10px] font-black text-ink-muted uppercase tracking-widest">Panier Moyen</div>
                               <div className="text-2xl font-black text-ink">8,200 <span className="text-[10px] opacity-50">FCFA</span></div>
                            </div>
                         </div>
                         <div className="h-24 flex items-end gap-1.5 pt-4">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                              <div key={i} className="flex-1 bg-surface-2 rounded-t-lg relative group/bar">
                                 <div className="absolute bottom-0 inset-x-0 bg-gold/20 rounded-t-lg transition-all group-hover/bar:bg-gold/40" style={{ height: `${h}%` }}></div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
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
                      <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black text-gold uppercase tracking-[0.2em] border-b-2 border-gold/30 hover:border-gold transition-all">Voir tout l'historique</button>
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
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 mt-12"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-4 overflow-x-auto pwa-hide-scrollbar">
                    {['Tous', 'En attente', 'En préparation', 'Terminé'].map((status, i) => (
                      <button key={i} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-navy text-white shadow-xl' : 'bg-card-bg border border-border text-ink-muted hover:text-gold'}`}>
                        {status}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                     <button className="p-4 bg-card-bg border border-border rounded-xl text-ink-muted hover:text-gold transition-colors"><Filter size={20}/></button>
                     <button className="p-4 bg-card-bg border border-border rounded-xl text-ink-muted hover:text-gold transition-colors"><Search size={20}/></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <div key={i} className="card-premium bg-card-bg border-none shadow-xl flex flex-col md:flex-row md:items-center gap-10 hover:translate-x-2 transition-transform cursor-pointer">
                      <div className="flex items-center gap-8 flex-1">
                        <div className="w-20 h-20 bg-surface-2 rounded-3xl flex flex-col items-center justify-center border border-border">
                          <span className="text-[10px] font-black text-ink-muted uppercase tracking-tighter">Table</span>
                          <span className="text-3xl font-black text-gold">0{i + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-ink mb-1">Commande #PAY-10{i}</h4>
                          <p className="text-xs font-bold text-ink-muted uppercase tracking-widest">3 Articles • 12.500 FCFA • Wave Pay</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="px-6 py-2 bg-success/10 text-success rounded-full text-[10px] font-black uppercase tracking-widest">
                          Payé
                        </div>
                        <div className="px-6 py-2 bg-gold/10 text-gold rounded-full text-[10px] font-black uppercase tracking-widest">
                          En préparation
                        </div>
                        <button className="w-12 h-12 bg-surface-2 rounded-2xl flex items-center justify-center text-ink-muted hover:text-gold transition-all">
                          <ChevronRight size={24} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="mt-12 space-y-12"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6 overflow-x-auto pwa-hide-scrollbar">
                    {restaurant.categories.map((cat, i) => (
                      <button key={i} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-gold text-navy shadow-lg' : 'bg-card-bg border border-border text-ink-muted hover:text-gold'}`}>
                        {cat.name}
                      </button>
                    ))}
                    <button className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center text-ink-muted hover:text-gold border border-border"><Plus size={20}/></button>
                  </div>
                  <button className="btn-gold flex items-center gap-3">
                    <Plus size={20}/> AJOUTER UN PLAT
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {restaurant.menu.map((item, i) => (
                    <div key={i} className="card-premium bg-card-bg border-none shadow-xl overflow-hidden group">
                      <div className="relative h-56 -mx-8 -mt-8 mb-8 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                           <div className="flex gap-3">
                              <button className="p-3 bg-white text-navy rounded-xl hover:bg-gold transition-colors shadow-xl"><Edit3 size={18}/></button>
                              <button className="p-3 bg-white text-danger rounded-xl hover:bg-danger hover:text-white transition-colors shadow-xl"><Trash2 size={18}/></button>
                           </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-black text-ink tracking-tight">{item.name}</h4>
                        <span className="font-black text-gold text-lg">{item.price.toLocaleString()} FCFA</span>
                      </div>
                      <p className="text-xs text-ink-muted font-medium leading-relaxed mb-8 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between pt-6 border-t border-border">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-success"></div>
                            <span className="text-[10px] font-black text-ink-muted uppercase tracking-widest">En Stock</span>
                         </div>
                         <button className="text-[10px] font-black text-gold uppercase tracking-widest border-b-2 border-gold/20 hover:border-gold transition-all">Détails</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'tables' && (
              <motion.div
                key="tables"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 space-y-12"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8">
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((t) => (
                    <div key={t} className="card-premium bg-card-bg border-none shadow-xl text-center hover-lift cursor-pointer group">
                      <div className={`w-20 h-20 rounded-[2rem] mx-auto mb-6 flex flex-col items-center justify-center transition-all ${t === 3 || t === 7 ? 'bg-danger/10 text-danger border border-danger/20' : 'bg-surface-2 text-gold border border-border group-hover:bg-gold group-hover:text-navy'}`}>
                         <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">Table</span>
                         <span className="text-3xl font-black mt-[-4px]">{t}</span>
                      </div>
                      <h5 className="text-[10px] font-black text-ink-muted uppercase tracking-[0.2em] mb-4">{t === 3 || t === 7 ? 'Occupée' : 'Libre'}</h5>
                      <div className="flex justify-center gap-2">
                        <button className="p-2 bg-surface-2 rounded-lg text-ink-muted hover:text-gold transition-all"><QrCode size={16}/></button>
                        <button className="p-2 bg-surface-2 rounded-lg text-ink-muted hover:text-gold transition-all"><Share2 size={16}/></button>
                      </div>
                    </div>
                  ))}
                  <button className="card-premium bg-surface-2 border-2 border-dashed border-border flex flex-col items-center justify-center text-ink-muted hover:border-gold hover:text-gold transition-all group">
                     <Plus size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Ajouter</span>
                  </button>
                </div>

                <div className="card-premium bg-navy text-white p-12 relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                      <div className="flex-1">
                         <h3 className="text-3xl font-black mb-4 tracking-tight leading-none">Commandez vos supports QR physiques</h3>
                         <p className="text-white/60 font-medium">Nous imprimons vos plaques de table, stickers et menus QR avec le branding de votre établissement.</p>
                      </div>
                      <button className="btn-gold whitespace-nowrap px-10">COMMANDER DES SUPPORTS</button>
                   </div>
                   <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
                </div>
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div
                key="payments"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-12 space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {[
                     { label: 'Total Semaine', value: '1.2M', icon: TrendingUp },
                     { label: 'Disponible', value: '450k', icon: CreditCard },
                     { label: 'En attente', value: '85k', icon: Clock }
                   ].map((s, i) => (
                     <div key={i} className="card-premium bg-card-bg border-none shadow-xl p-10">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center text-gold"><s.icon size={22}/></div>
                           <h5 className="text-[11px] font-black text-ink-muted uppercase tracking-[0.2em]">{s.label}</h5>
                        </div>
                        <div className="text-4xl font-black text-ink tracking-tighter">{s.value} <span className="text-sm font-bold text-ink-muted">FCFA</span></div>
                     </div>
                   ))}
                </div>

                <div className="card-premium bg-card-bg border-none shadow-2xl overflow-hidden">
                   <div className="p-10 border-b border-border flex items-center justify-between bg-surface-2/30">
                      <h3 className="text-xl font-black text-ink tracking-tight">Historique des transactions</h3>
                      <button className="text-[10px] font-black text-ink-muted uppercase tracking-widest flex items-center gap-2 hover:text-gold transition-all">Filtrer par date <ChevronDown size={14}/></button>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-surface-2/50 border-b border-border text-[10px] font-black text-ink-muted uppercase tracking-widest">
                            <tr>
                               <th className="px-10 py-6">Transaction</th>
                               <th className="px-10 py-6">Mode</th>
                               <th className="px-10 py-6">Date & Heure</th>
                               <th className="px-10 py-6">Montant</th>
                               <th className="px-10 py-6">Statut</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-border">
                            {[1,2,3,4,5].map(i => (
                              <tr key={i} className="hover:bg-surface-2/30 transition-colors">
                                 <td className="px-10 py-8">
                                    <div className="font-black text-ink">#TXN-9920{i}</div>
                                    <div className="text-[10px] text-ink-muted font-bold uppercase tracking-tighter">Table 0{i} • Commande #PAY-10{i}</div>
                                 </td>
                                 <td className="px-10 py-8">
                                    <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center text-ink-muted"><CreditCard size={14}/></div>
                                       <span className="text-sm font-black text-ink-muted uppercase">MTN MoMo</span>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8">
                                    <div className="text-sm font-bold text-ink">02 Mai, 2026</div>
                                    <div className="text-[10px] text-ink-muted font-bold uppercase">14:2{i}</div>
                                 </td>
                                 <td className="px-10 py-8 font-black text-ink">
                                    {(8500 * i).toLocaleString()} FCFA
                                 </td>
                                 <td className="px-10 py-8">
                                    <div className="flex items-center gap-2 text-success">
                                       <CheckCircle2 size={16}/>
                                       <span className="text-[10px] font-black uppercase tracking-widest">Réussi</span>
                                    </div>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-12 grid lg:grid-cols-3 gap-12"
              >
                <div className="lg:col-span-2 space-y-12">
                   <div className="card-premium bg-card-bg border-none shadow-xl">
                      <h3 className="text-xl font-black text-ink tracking-tight mb-10">Informations de l'établissement</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-ink-muted uppercase tracking-widest">Nom du restaurant</label>
                            <input type="text" defaultValue="Le Bon Goût" className="input-premium" />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-ink-muted uppercase tracking-widest">Email de contact</label>
                            <input type="email" defaultValue="contact@lebongout.bj" className="input-premium" />
                         </div>
                         <div className="space-y-3 md:col-span-2">
                            <label className="text-[10px] font-black text-ink-muted uppercase tracking-widest">Adresse physique</label>
                            <div className="relative">
                               <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-ink-muted" size={18}/>
                               <input type="text" defaultValue="Avenue Steinmetz, Cotonou, Bénin" className="input-premium input-with-icon" />
                            </div>
                         </div>
                         <div className="space-y-3 md:col-span-2">
                            <label className="text-[10px] font-black text-ink-muted uppercase tracking-widest">Description</label>
                            <textarea defaultValue="Le meilleur de la cuisine béninoise traditionnelle à Cotonou." className="input-premium min-h-[120px] pt-5" />
                         </div>
                      </div>
                      <div className="mt-12 flex justify-end">
                         <button className="btn-gold px-12">ENREGISTRER LES MODIFICATIONS</button>
                      </div>
                   </div>

                   <div className="card-premium bg-card-bg border-none shadow-xl">
                      <h3 className="text-xl font-black text-ink tracking-tight mb-10">Horaires d'ouverture</h3>
                      <div className="space-y-6">
                         {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day, i) => (
                           <div key={i} className="flex items-center justify-between p-4 bg-surface-2 rounded-2xl border border-border">
                              <span className="font-black text-sm text-ink">{day}</span>
                              <div className="flex items-center gap-4">
                                 <input type="text" defaultValue="11h00" className="w-24 bg-card-bg border border-border rounded-xl px-4 py-2 text-xs font-bold text-center outline-none focus:border-gold" />
                                 <span className="text-ink-muted opacity-30">—</span>
                                 <input type="text" defaultValue="23h00" className="w-24 bg-card-bg border border-border rounded-xl px-4 py-2 text-xs font-bold text-center outline-none focus:border-gold" />
                                 <div className="w-12 h-6 bg-success/20 rounded-full relative flex items-center px-1">
                                    <div className="w-4 h-4 bg-success rounded-full ml-auto"></div>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-12">
                   <div className="card-premium bg-card-bg border-none shadow-xl text-center">
                      <div className="relative w-32 h-32 mx-auto mb-8">
                         <img src={restaurant.logo} className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border-4 border-white dark:border-border" />
                         <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gold text-navy rounded-xl flex items-center justify-center shadow-xl border-4 border-white dark:border-card-bg"><Edit3 size={16}/></button>
                      </div>
                      <h4 className="text-2xl font-black text-ink tracking-tight">{restaurant.name}</h4>
                      <p className="text-[10px] font-black text-ink-muted uppercase tracking-[0.2em] mt-2 mb-8">{restaurant.type} • Cotonou</p>
                      <button className="w-full py-4 border-2 border-border rounded-2xl text-[10px] font-black text-ink-muted uppercase tracking-widest hover:border-gold hover:text-gold transition-all flex items-center justify-center gap-3">
                         <Globe size={16}/> VOIR LE MENU PUBLIC
                      </button>
                   </div>

                   <div className="bg-danger/5 border border-danger/20 rounded-[3rem] p-10">
                      <h4 className="text-danger font-black uppercase text-[10px] tracking-widest mb-4">Zone de danger</h4>
                      <p className="text-danger/60 text-xs font-medium mb-8 leading-relaxed">La suppression de votre compte est irréversible. Toutes vos données seront effacées.</p>
                      <button className="w-full py-4 bg-danger text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-danger/20 hover:opacity-90 transition-all">SUPPRIMER MON COMPTE</button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
