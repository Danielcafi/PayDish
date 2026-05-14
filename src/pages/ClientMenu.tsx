/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Minus, 
  ChevronRight, 
  Star, 
  Trash2,
  X,
  ArrowLeft
} from 'lucide-react';
import { RESTAURANTS } from '../data';
import { Plate, OrderItem } from '../types';

export default function ClientMenu() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Plats de Résistance');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cart, setCart] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem(`paydish_cart_${restaurantId}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(`paydish_cart_${restaurantId}`, JSON.stringify(cart));
  }, [cart, restaurantId]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId) || RESTAURANTS[0];
  const filteredMenu = restaurant.menu.filter(p => {
    const matchesCategory = p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return isSearchOpen ? matchesSearch : matchesCategory;
  });

  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const addToCart = (plate: Plate) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === plate.id);
      if (existing) {
        return prev.map(item => item.id === plate.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...plate, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item).filter(item => item.quantity > 0));
  };

  return (
    <div className="min-h-screen-dynamic bg-surface-2 pb-24 transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-navy rounded-xl overflow-hidden shadow-sm">
            <img src={restaurant.logo} alt={restaurant.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-sm font-black text-navy uppercase tracking-tight">{restaurant.name}</h1>
               <span className="text-[10px] font-black text-gold uppercase tracking-widest">Commande Rapide</span>
          </div>
        </div>
        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors ${isSearchOpen ? 'bg-navy text-white' : 'bg-surface-2 text-navy'}`}>
           <Search size={18} />
        </button>
      </header>

      {/* Search Bar Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un plat..."
                className="w-full bg-surface-2 rounded-xl py-3 pl-10 pr-4 text-sm font-bold text-navy outline-none border border-border focus:border-navy transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-navy">
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories */}
      <div className="sticky top-[73px] z-30 bg-white/50 backdrop-blur-md border-b border-border overflow-x-auto pwa-hide-scrollbar">
        <div className="flex px-6 py-4 gap-3 min-w-max">
          {restaurant.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.name ? 'bg-navy text-white shadow-lg' : 'bg-surface-2 text-ink-muted hover:text-navy'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <main className="p-6 max-w-screen-md mx-auto space-y-8">
        <div className="flex items-center justify-between">
           <h2 className="text-xl font-black text-navy">{activeCategory}</h2>
           <span className="text-[10px] font-black text-ink-muted uppercase tracking-widest">{filteredMenu.length} Plats</span>
        </div>
        
        <div className="space-y-4">
          {filteredMenu.map((plate) => (
            <motion.div
              layout
              key={plate.id}
              className="bg-white p-4 rounded-[2rem] border border-border flex gap-4 transition-all hover:shadow-xl hover:shadow-navy/5 group"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-surface-2 rounded-2xl overflow-hidden shrink-0 relative">
                <img src={plate.image} alt={plate.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {plate.popular && (
                  <div className="absolute top-2 left-2 bg-gold text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg">
                    <Star size={10} fill="currentColor" /> Top
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="text-base font-black text-navy mb-1">{plate.name}</h3>
                  <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">{plate.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="font-black text-navy text-sm">{plate.price.toLocaleString()} <span className="text-[10px] opacity-50">FCFA</span></span>
                  
                  {cart.find(i => i.id === plate.id) ? (
                    <div className="flex items-center gap-4 bg-surface-2 rounded-full p-1 border border-border">
                       <button onClick={() => removeFromCart(plate.id)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-navy shadow-sm"><Minus size={14} /></button>
                       <span className="font-black text-xs w-4 text-center">{cart.find(i => i.id === plate.id)?.quantity}</span>
                       <button onClick={() => addToCart(plate)} className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white shadow-sm"><Plus size={14} /></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(plate)}
                      className="bg-navy text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all hover:bg-gold"
                    >
                      <Plus size={20} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Cart (Mobile) */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-6 right-6 z-50 lg:max-w-md lg:left-1/2 lg:-translate-x-1/2"
          >
            <button 
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-navy text-white p-5 rounded-[2.5rem] shadow-2xl flex items-center justify-between group overflow-hidden relative border border-white/5"
            >
              <div className="flex items-center gap-5">
                <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center relative">
                  <ShoppingBag size={24} />
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-navy">
                    {cartCount}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Votre commande</p>
                  <p className="text-lg font-black">{cartTotal.toLocaleString()} FCFA</p>
                </div>
              </div>
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform text-gold" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-navy/60 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-[3rem] z-[70] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-black text-navy">Votre Panier</h2>
                  <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 bg-surface-2 rounded-full flex items-center justify-center text-navy"><X size={20} /></button>
                </div>

                <div className="space-y-6 mb-12">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-5">
                      <div className="w-20 h-20 bg-surface-2 rounded-2xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-navy truncate">{item.name}</h4>
                          <span className="font-bold text-navy">{ (item.price * item.quantity).toLocaleString() } FCFA</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-5 bg-surface-2 rounded-full py-1.5 px-4 border border-border">
                             <button onClick={() => removeFromCart(item.id)} className="text-navy"><Minus size={14} /></button>
                             <span className="font-black text-sm">{item.quantity}</span>
                             <button onClick={() => addToCart(item)} className="text-navy"><Plus size={14} /></button>
                           </div>
                           <button onClick={() => setCart(prev => prev.filter(p => p.id !== item.id))} className="text-danger hover:scale-110 transition-transform"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-surface-2 p-8 rounded-[2rem] space-y-4 mb-10 border border-border">
                   <div className="flex justify-between text-xs font-black uppercase tracking-widest text-ink-muted">
                     <span>Total Partiel</span>
                     <span>{cartTotal.toLocaleString()} FCFA</span>
                   </div>
                   <div className="flex justify-between text-xs font-black uppercase tracking-widest text-success">
                     <span>Service PayDish</span>
                     <span>Inclus</span>
                   </div>
                   <div className="h-px bg-border my-2"></div>
                   <div className="flex justify-between text-2xl font-black text-navy">
                     <span>Total</span>
                     <span>{cartTotal.toLocaleString()} FCFA</span>
                   </div>
                </div>

                <button 
                  onClick={() => navigate('/paiement', { state: { cart, total: cartTotal, restaurantId } })}
                  className="w-full btn-gold py-6 flex items-center justify-center gap-3"
                >
                  Confirmer la commande <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
