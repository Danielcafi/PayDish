/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Minus, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  X,
  Star,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { RESTAURANTS } from '../data';
import { Plate, OrderItem } from '../types';

export default function ClientMenu() {
  const { restaurantId, tableId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Plats de Résistance');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId) || RESTAURANTS[0];
  const filteredMenu = restaurant.menu.filter(p => p.category === activeCategory);

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
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Client Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center p-1.5 overflow-hidden shadow-sm shadow-brand-green/10">
            <img src={restaurant.logo} alt={restaurant.name} className="w-full h-full object-cover rounded-md" />
          </div>
          <div>
            <h1 className="font-black text-brand-dark leading-none">{restaurant.name}</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-brand-green uppercase tracking-wider">Table {tableId || '7'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2.5 bg-gray-100 rounded-full text-brand-dark"><Search className="w-5 h-5" /></button>
        </div>
      </header>

      {/* Categories Toolbar */}
      <div className="sticky top-[65px] z-30 bg-white border-b border-gray-100 overflow-x-auto pwa-hide-scrollbar">
        <div className="flex px-4 py-3 gap-2 min-w-max">
          {restaurant.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat.name ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Plates Grid */}
      <main className="p-4 max-w-screen-md mx-auto space-y-6">
        <h2 className="text-xl font-black text-brand-dark">Menu — {activeCategory}</h2>
        <div className="space-y-4">
          {filteredMenu.map((plate) => (
            <motion.div
              layout
              key={plate.id}
              className="bg-white p-3 rounded-[24px] shadow-soft border border-gray-100 flex gap-4 overflow-hidden relative group"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-2xl overflow-hidden shrink-0 relative">
                <img src={plate.image} alt={plate.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {plate.popular && (
                  <div className="absolute top-2 left-2 bg-brand-orange text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1">
                    <Star className="w-2 h-2 fill-current" /> Populaire
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="text-base font-black text-brand-dark mb-1">{plate.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{plate.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-black text-brand-green text-sm">{plate.price.toLocaleString()} FCFA</span>
                  
                  {cart.find(i => i.id === plate.id) ? (
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                       <button onClick={() => removeFromCart(plate.id)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-sm"><Minus className="w-4 h-4" /></button>
                       <span className="font-black text-sm w-4 text-center">{cart.find(i => i.id === plate.id)?.quantity}</span>
                       <button onClick={() => addToCart(plate)} className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white shadow-sm"><Plus className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(plate)}
                      className="bg-brand-dark text-white p-2.5 rounded-full shadow-lg shadow-black/10 active:scale-90 transition-transform"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Cart Bar (Mobile) */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-4 right-4 z-50 lg:max-w-md lg:left-1/2 lg:-translate-x-1/2"
          >
            <button 
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-brand-green text-white p-4 rounded-[24px] shadow-2xl flex items-center justify-between group overflow-hidden relative"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center relative">
                  <ShoppingBag className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-brand-green">
                    {cartCount}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-widest opacity-70">Voir le panier</div>
                  <div className="text-lg font-black leading-none">{cartTotal.toLocaleString()} FCFA</div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
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
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-[40px] z-[70] max-h-[85vh] flex flex-col shadow-2xl"
            >
              <div className="p-8 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-brand-dark">Votre Panier</h2>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 bg-gray-100 rounded-full"><X className="w-6 h-6" /></button>
                </div>

                <div className="space-y-6 mb-12">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-black text-brand-dark truncate">{item.name}</h4>
                          <span className="font-black text-brand-green text-sm">{ (item.price * item.quantity).toLocaleString() } FCFA</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4 bg-gray-50 rounded-full py-1 px-3">
                             <button onClick={() => removeFromCart(item.id)} className="text-brand-dark"><Minus className="w-3 h-3" /></button>
                             <span className="font-black text-xs">{item.quantity}</span>
                             <button onClick={() => addToCart(item)} className="text-brand-dark"><Plus className="w-3 h-3" /></button>
                           </div>
                           <button onClick={() => setCart(prev => prev.filter(p => p.id !== item.id))} className="text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-6 rounded-3xl space-y-3 mb-8 border border-gray-100">
                   <div className="flex justify-between text-sm font-medium text-gray-500">
                     <span>Sous-total</span>
                     <span>{cartTotal.toLocaleString()} FCFA</span>
                   </div>
                   <div className="flex justify-between text-sm font-medium text-gray-500">
                     <span>Frais de service (0%)</span>
                     <span className="text-brand-green">Gratuit</span>
                   </div>
                   <div className="h-px bg-gray-200 my-2"></div>
                   <div className="flex justify-between text-xl font-black text-brand-dark">
                     <span>Total</span>
                     <span>{cartTotal.toLocaleString()} FCFA</span>
                   </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Notes spéciales</label>
                  <textarea 
                    placeholder="Instructions (sans oignon, bien cuit...)" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-brand-green/20 h-24"
                  ></textarea>
                </div>

                <button 
                  onClick={() => navigate('/paiement', { state: { cart, total: cartTotal } })}
                  className="w-full bg-brand-green text-white py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-brand-green/20"
                >
                  Passer la commande
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
