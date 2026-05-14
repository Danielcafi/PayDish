/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Star,
  MoreVertical,
  Sparkles,
  Filter,
  Trash2,
  Edit3,
  Globe,
  Share2,
  ChevronDown,
  MapPin,
  User,
  ChevronLeft,
  Wallet,
  Download
} from 'lucide-react';
import { RESTAURANTS, MOCK_ORDERS } from '../data';
import { Link } from 'react-router-dom';
import ThemeToggle from '../lib/ThemeToggle';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const restaurant = RESTAURANTS[0];
  
  return (
    <div className="min-h-screen-dynamic bg-surface flex selection:bg-sage/30 selection:text-forest transition-colors duration-500">
      {/* Sidebar - Desktop */}
      <aside className="w-72 bg-surface dark:bg-forest hidden lg:flex flex-col text-forest dark:text-white border-r border-border relative z-20 transition-colors duration-500">
        <div className="p-10">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="PayDish" className="h-8 w-auto" />
            <span className="text-xl font-normal tracking-tighter text-forest dark:text-white uppercase font-diplomata">PayDish</span>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-4">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Tableau de bord' },
            { id: 'orders', icon: ShoppingBag, label: 'Commandes', badge: '5' },
            { id: 'menu', icon: UtensilsCrossed, label: 'Carte Digitale' },
            { id: 'qrcode', icon: QrCode, label: 'QR Code Menu' },
            { id: 'payments', icon: CreditCard, label: 'Finance' },
            { id: 'settings', icon: Settings, label: 'Paramètres' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
                activeTab === item.id 
                ? 'bg-forest/5 dark:bg-white/10 text-sage' 
                : 'text-ink-muted dark:text-white/40 hover:text-forest dark:hover:text-white hover:bg-forest/5 dark:hover:bg-white/5'
              }`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {item.label}
              {item.badge && (
                <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === item.id ? 'bg-sage text-forest dark:text-white' : 'bg-forest/10 dark:bg-white/10 text-ink-muted dark:text-white/40'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
          <div className="bg-surface-2 dark:bg-white/5 border border-border dark:border-white/10 p-5 rounded-3xl flex items-center gap-4">
            <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center font-black text-white dark:text-forest shadow-lg text-xs">AK</div>
            <div className="flex-1 overflow-hidden">
              <div className="text-xs font-bold truncate text-forest dark:text-white">Adjoua Koffi</div>
              <div className="text-[9px] text-ink-muted dark:text-white/30 font-black uppercase tracking-widest truncate">Le Bon Goût</div>
            </div>
            <button className="text-ink-muted dark:text-white/20 hover:text-danger transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto w-full relative z-10 bg-surface-2 transition-colors duration-500">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-surface-2/80 backdrop-blur-md px-10 py-6 flex items-center justify-between border-b border-border transition-colors duration-500">
          <div>
            <h1 className="text-2xl font-normal text-forest dark:text-cream tracking-tight font-diplomata">Bienvenue, Adjoua.</h1>
            <p className="text-ink-muted text-[10px] font-black uppercase tracking-[0.3em] mt-1">Samedi 2 Mai 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface rounded-xl border border-border">
               <Search size={16} className="text-ink-muted" />
               <input type="text" placeholder="Rechercher..." className="bg-transparent text-xs font-medium outline-none w-40" />
            </div>
            <ThemeToggle />
            <div className="w-[1px] h-8 bg-border mx-2"></div>
            <button className="p-3 bg-surface rounded-xl border border-border text-ink-muted relative hover:text-sage transition-colors shadow-sm">
              <Bell size={20} />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-surface"></div>
            </button>
            <button className="btn-primary flex items-center gap-2 h-12">
              <Plus size={18} />
              NOUVEAU PLAT
            </button>
          </div>
        </header>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                   {[
                     { label: 'Revenus du jour', value: '125,400', icon: TrendingUp, trend: '+12%', color: 'text-success' },
                     { label: 'Commandes actives', value: '12', icon: ShoppingBag, trend: null, color: 'text-sage' },
                     { label: 'Temps moyen', value: '14 min', icon: Clock, trend: '-2m', color: 'text-success' },
                     { label: 'Satisfaction', value: '4.9/5', icon: Star, trend: null, color: 'text-sage' }
                   ].map((stat, i) => (
                      <div key={i} className="bg-surface-2 p-6 rounded-[2rem] border border-border">
                        <div className="flex items-center justify-between mb-4">
                           <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center text-forest dark:text-sage">
                              <stat.icon size={20} />
                           </div>
                           {stat.trend && <span className={`text-[10px] font-black ${stat.color}`}>{stat.trend}</span>}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-ink-muted mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-normal text-forest dark:text-cream font-diplomata">{stat.value}</h3>
                     </div>
                   ))}
                </div>

                {/* Main Graph Card */}
                <div className="grid xl:grid-cols-3 gap-8">
                   <div className="xl:col-span-2 bg-surface-2 rounded-[2.5rem] border border-border p-10 relative overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                         <div>
                            <h3 className="text-xl font-normal text-forest dark:text-cream font-diplomata">Analyse des Revenus</h3>
                            <p className="text-xs font-medium text-ink-muted mt-1">Comparaison des 7 derniers jours</p>
                         </div>
                         <div className="flex gap-2">
                            <button className="px-5 py-2 bg-forest text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Hebdomadaire</button>
                            <button className="px-5 py-2 bg-surface-2 text-ink-muted rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-forest transition-colors">Mensuel</button>
                         </div>
                      </div>

                      <div className="relative h-64 w-full">
                         {/* Simplified modern graph representation */}
                         <div className="absolute inset-0 flex items-end justify-between gap-4">
                            {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                               <div key={i} className="flex-1 group relative flex flex-col items-center">
                                  <div className="w-full bg-surface-2 rounded-2xl relative overflow-hidden transition-all duration-500 hover:bg-sage/10" style={{ height: `${h}%` }}>
                                     <div className="absolute bottom-0 left-0 right-0 bg-sage/30 rounded-2xl" style={{ height: `${h/2}%` }}></div>
                                     <div className="absolute top-0 left-0 right-0 bg-forest opacity-5 h-full transition-all group-hover:opacity-0"></div>
                                  </div>
                                  <span className="mt-4 text-[9px] font-black text-ink-muted uppercase tracking-widest">{['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i]}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Insight Card */}
                   <div className="bg-forest text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden flex flex-col justify-between">
                      <div className="relative z-10">
                         <div className="w-12 h-12 bg-sage/20 rounded-2xl flex items-center justify-center text-sage mb-8">
                            <Sparkles size={24} />
                         </div>
                         <h3 className="text-2xl font-normal mb-4 leading-tight font-diplomata">Insight PayDish AI</h3>
                         <p className="text-white/60 text-sm font-medium leading-relaxed mb-10">
                            Le plat <span className="text-sage font-bold">"Atassi Royale"</span> performe 40% mieux le samedi. Pensez à augmenter votre stock de piment noir.
                         </p>
                      </div>
                      <button className="w-full bg-white text-forest py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest relative z-10 shadow-xl hover:bg-sage transition-colors">
                         Optimiser les stocks
                      </button>
                      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-sage/10 blur-[80px] rounded-full"></div>
                   </div>
                </div>

                {/* Table Section */}
                <div className="bg-surface-2 rounded-[2.5rem] border border-border overflow-hidden">
                   <div className="p-8 border-b border-border flex items-center justify-between">
                      <h3 className="text-xl font-normal text-forest dark:text-cream font-diplomata">Commandes Récentes</h3>
                      <button className="text-[10px] font-black text-sage uppercase tracking-widest border-b-2 border-sage/20 hover:border-sage transition-all">Tout l'historique</button>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-surface-2/50 text-[10px] font-black text-ink-muted uppercase tracking-widest">
                            <tr>
                               <th className="px-8 py-5">ID Commande</th>
                               <th className="px-8 py-5">Table</th>
                               <th className="px-8 py-5">Montant</th>
                               <th className="px-8 py-5">Méthode</th>
                               <th className="px-8 py-5">Statut</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-border">
                            {MOCK_ORDERS.map((order, i) => (
                               <tr key={i} className="hover:bg-surface-2 transition-colors">
                                  <td className="px-8 py-6">
                                     <div className="text-sm font-bold text-forest dark:text-cream">#PAY-{order.id.split('-')[1]}</div>
                                     <div className="text-[10px] text-ink-muted font-medium uppercase mt-1">Il y a 12 min</div>
                                  </td>
                                  <td className="px-8 py-6">
                                     <span className="px-3 py-1 bg-surface rounded-lg text-xs font-black text-forest dark:text-sage border border-border">Table {order.tableNumber}</span>
                                  </td>
                                  <td className="px-8 py-6 font-bold text-sm text-forest dark:text-cream">{order.total.toLocaleString()} FCFA</td>
                                   <td className="px-8 py-6">
                                     <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-sage"></div>
                                        <span className="text-[10px] font-black uppercase text-ink-muted tracking-widest">{order.paymentMethod || 'Wave'}</span>
                                     </div>
                                  </td>
                                  <td className="px-8 py-6">
                                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        order.status === 'preparing' ? 'bg-sage/10 text-sage' : 'bg-success/10 text-success'
                                     }`}>
                                        {order.status === 'preparing' ? 'En Cuisine' : 'Servi'}
                                     </span>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="flex gap-4">
                      {restaurant.categories.map((cat, i) => (
                        <button key={i} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-forest text-white shadow-lg' : 'bg-surface-2 border border-border text-ink-muted hover:text-forest'}`}>
                           {cat.name}
                        </button>
                      ))}
                   </div>
                   <button className="btn-primary flex items-center gap-2">
                      <Plus size={18} /> AJOUTER UN PLAT
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                   {restaurant.menu.map((item, i) => (
                     <div key={i} className="bg-surface-2 rounded-[2.5rem] border border-border overflow-hidden">
                        <div className="h-56 relative overflow-hidden">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-forest/20 opacity-0 transition-opacity flex items-center justify-center gap-3">
                              <button className="p-3 bg-surface-2 text-forest rounded-xl transition-colors shadow-xl"><Edit3 size={18}/></button>
                              <button className="p-3 bg-surface-2 text-danger rounded-xl transition-colors shadow-xl"><Trash2 size={18}/></button>
                           </div>
                        </div>
                        <div className="p-8">
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="text-xl font-normal text-forest font-diplomata">{item.name}</h4>
                              <span className="font-bold text-sage">{item.price.toLocaleString()} FCFA</span>
                           </div>
                           <p className="text-xs text-ink-muted font-medium mb-6 line-clamp-2 leading-relaxed">{item.description}</p>
                           <div className="pt-6 border-t border-border flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-success"></div>
                                 <span className="text-[10px] font-black uppercase text-ink-muted tracking-widest">En Stock</span>
                              </div>
                              <button className="text-[10px] font-black text-forest uppercase tracking-widest hover:text-sage transition-colors">Modifier</button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-normal text-forest dark:text-cream font-diplomata">Gestion des Commandes</h2>
                  <div className="flex gap-2">
                    <button className="px-5 py-2.5 bg-surface-2 border border-border text-ink-muted rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-forest transition-colors">Historique</button>
                    <button className="px-5 py-2.5 bg-forest text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2"><Filter size={14} /> Filtrer</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
                  {/* Kanban Column: Nouvelles */}
                  <div className="bg-surface-2/50 rounded-[2rem] p-6 border border-border/50 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-black uppercase tracking-widest text-forest dark:text-cream flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-danger animate-pulse"></div>
                        À Préparer
                      </h3>
                      <span className="bg-surface border border-border text-ink-muted text-[10px] font-black px-2 py-1 rounded-lg">1</span>
                    </div>
                    {MOCK_ORDERS.filter(o => o.status === 'pending').map(order => (
                      <div key={order.id} className="bg-surface rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow cursor-grab">
                        <div className="flex justify-between items-start mb-4">
                           <span className="px-3 py-1 bg-surface-2 rounded-lg text-xs font-black text-forest border border-border">Table {order.tableNumber}</span>
                           <span className="text-[10px] font-black text-ink-muted uppercase">12:45</span>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {order.items.map((item, i) => (
                            <li key={i} className="text-sm font-medium text-forest dark:text-cream flex items-start gap-2">
                              <span className="text-sage font-bold">{item.quantity}x</span> {item.name}
                            </li>
                          ))}
                        </ul>
                        <div className="pt-4 border-t border-border flex justify-between items-center">
                          <span className="text-[10px] font-black text-ink-muted uppercase tracking-widest">{order.total} FCFA</span>
                          <button className="bg-sage/10 text-sage hover:bg-sage hover:text-forest px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors">
                            Cuisiner
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Kanban Column: En Cuisine */}
                  <div className="bg-surface-2/50 rounded-[2rem] p-6 border border-border/50 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-black uppercase tracking-widest text-forest dark:text-cream flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-sage"></div>
                        En Cuisine
                      </h3>
                      <span className="bg-surface border border-border text-ink-muted text-[10px] font-black px-2 py-1 rounded-lg">1</span>
                    </div>
                    {MOCK_ORDERS.filter(o => o.status === 'preparing').map(order => (
                      <div key={order.id} className="bg-surface rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow cursor-grab">
                        <div className="flex justify-between items-start mb-4">
                           <span className="px-3 py-1 bg-surface-2 rounded-lg text-xs font-black text-forest border border-border">Table {order.tableNumber}</span>
                           <span className="text-[10px] font-black text-sage uppercase">12:30</span>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {order.items.map((item, i) => (
                            <li key={i} className="text-sm font-medium text-forest dark:text-cream flex items-start gap-2">
                              <span className="text-sage font-bold">{item.quantity}x</span> {item.name}
                            </li>
                          ))}
                        </ul>
                        <div className="pt-4 border-t border-border flex justify-between items-center">
                           <div className="flex -space-x-2">
                              <div className="w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center text-[8px] font-bold border-2 border-surface">AK</div>
                           </div>
                           <button className="bg-success/10 text-success hover:bg-success hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors">
                            Servir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Kanban Column: Prêtes */}
                  <div className="bg-surface-2/50 rounded-[2rem] p-6 border border-border/50 flex flex-col gap-4 opacity-70">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-black uppercase tracking-widest text-ink-muted flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-ink-muted"></div>
                        Servies
                      </h3>
                      <span className="bg-surface border border-border text-ink-muted text-[10px] font-black px-2 py-1 rounded-lg">0</span>
                    </div>
                    {/* Empty State */}
                    <div className="flex flex-col items-center justify-center h-40 text-center border-2 border-dashed border-border rounded-2xl">
                       <CheckCircle2 size={24} className="text-border mb-2" />
                       <span className="text-[10px] font-black text-ink-muted uppercase tracking-widest">Aucune commande</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'qrcode' && (
              <motion.div
                key="qrcode"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-4xl mx-auto space-y-10 pb-10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div>
                      <h2 className="text-2xl font-normal text-forest dark:text-cream font-diplomata">Menu QR Code</h2>
                      <p className="text-xs font-medium text-ink-muted mt-1">Imprimez ce QR Code unique. Vos clients le scanneront pour commander et payer.</p>
                   </div>
                </div>

                <div className="bg-surface-2 p-10 md:p-16 rounded-[3rem] border border-border flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
                   {/* Visual Background Elements */}
                   <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-sage/10 rounded-full blur-[100px] pointer-events-none"></div>

                   {/* The QR Code Container */}
                   <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shrink-0 relative border-[8px] border-forest">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-forest text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-lg">
                         Scannez pour commander
                      </div>
                      <div className="w-48 h-48 sm:w-64 sm:h-64 bg-surface-2 rounded-2xl flex items-center justify-center p-4">
                         {/* We simulate a QR code with an image or icon */}
                         <img src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=https://paydish.com/menu/${restaurant.id}&color=1C3F3A`} alt="QR Code" className="w-full h-full object-contain" />
                      </div>
                      <div className="mt-6 text-center">
                         <img src="/logo.png" alt="PayDish" className="h-6 w-auto mx-auto mb-2 opacity-50" />
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-forest">PayDish.com</p>
                      </div>
                   </div>

                   <div className="flex-1 space-y-8 text-center md:text-left relative z-10">
                      <div>
                         <h3 className="text-3xl font-normal text-forest font-diplomata mb-4">Un seul scan pour commander & payer.</h3>
                         <p className="text-sm font-medium text-ink-muted leading-relaxed">
                           Ce QR Code est universel. Placez-le sur toutes vos tables, au comptoir, ou à l'entrée. Vos clients n'ont plus besoin d'attendre la carte ou l'addition.
                         </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-surface p-5 rounded-2xl border border-border">
                            <div className="w-8 h-8 rounded-full bg-sage/20 text-sage flex items-center justify-center mb-3"><Download size={16}/></div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-forest">Télécharger PNG</div>
                         </div>
                         <div className="bg-surface p-5 rounded-2xl border border-border">
                            <div className="w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center mb-3"><Globe size={16}/></div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-forest">Copier le Lien</div>
                         </div>
                      </div>

                      <button className="w-full btn-primary py-4 text-sm mt-4 shadow-xl shadow-sage/20">
                         Commander des chevalets pré-imprimés
                      </button>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div>
                      <h2 className="text-2xl font-normal text-forest dark:text-cream font-diplomata">Finance & Transactions</h2>
                      <p className="text-xs font-medium text-ink-muted mt-1">Suivez vos encaissements Mobile Money et espèces.</p>
                   </div>
                   <button className="px-5 py-2.5 bg-surface-2 border border-border text-ink-muted rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-forest transition-colors flex items-center gap-2">
                      <Share2 size={14} /> Exporter CSV
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-forest text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                      <div className="relative z-10">
                         <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Solde Disponible</p>
                         <h3 className="text-4xl font-normal font-diplomata mb-6">450,000 <span className="text-xl opacity-50">FCFA</span></h3>
                         <button className="w-full bg-white text-forest py-3 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg hover:bg-sage transition-colors">
                            Retirer vers Banque
                         </button>
                      </div>
                      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sage/20 rounded-full blur-3xl"></div>
                   </div>

                   <div className="md:col-span-2 bg-surface-2 p-8 rounded-[2rem] border border-border">
                      <h3 className="text-sm font-black uppercase tracking-widest text-forest mb-6">Dernières Transactions</h3>
                      <div className="space-y-4">
                         {[
                            { id: '#TR-001', amount: 8000, method: 'MoMo', time: '12:45', status: 'completed' },
                            { id: '#TR-002', amount: 15000, method: 'Wave', time: '11:20', status: 'completed' },
                            { id: '#TR-003', amount: 4500, method: 'Espèces', time: '10:05', status: 'completed' },
                         ].map((tx, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-border hover:shadow-sm transition-shadow">
                               <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.method === 'MoMo' ? 'bg-[#FFCC00]/20 text-[#FFCC00]' : tx.method === 'Wave' ? 'bg-[#1C51F1]/20 text-[#1C51F1]' : 'bg-surface-2 text-forest'}`}>
                                     <Wallet size={18} />
                                  </div>
                                  <div>
                                     <div className="text-sm font-bold text-forest">{tx.id}</div>
                                     <div className="text-[10px] font-black uppercase tracking-widest text-ink-muted">{tx.method} • {tx.time}</div>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <div className="text-sm font-bold text-forest">+{tx.amount.toLocaleString()}</div>
                                  <div className="text-[10px] font-black uppercase tracking-widest text-success">Complété</div>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-3xl space-y-10 pb-10"
              >
                <div>
                   <h2 className="text-2xl font-normal text-forest dark:text-cream font-diplomata">Paramètres du Restaurant</h2>
                   <p className="text-xs font-medium text-ink-muted mt-1">Gérez les informations publiques de votre établissement.</p>
                </div>

                <div className="bg-surface-2 p-8 md:p-10 rounded-[2.5rem] border border-border space-y-8">
                   <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-surface rounded-3xl border border-border flex items-center justify-center overflow-hidden shadow-sm">
                         <img src={restaurant.logo} alt="Logo" className="w-full h-full object-cover" />
                      </div>
                      <button className="px-5 py-2.5 bg-forest text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Changer le logo</button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted">Nom du Restaurant</label>
                         <input type="text" defaultValue={restaurant.name} className="input-premium w-full" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted">Type d'établissement</label>
                         <input type="text" defaultValue={restaurant.type} className="input-premium w-full" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted">Description courte</label>
                         <textarea defaultValue={restaurant.description} rows={3} className="input-premium w-full resize-none py-4"></textarea>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted">Téléphone</label>
                         <input type="text" defaultValue={restaurant.phone} className="input-premium w-full" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted">Heures d'ouverture</label>
                         <input type="text" defaultValue={restaurant.openingHours} className="input-premium w-full" />
                      </div>
                   </div>

                   <div className="pt-8 border-t border-border flex justify-end">
                      <button className="btn-primary">Sauvegarder les modifications</button>
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
