/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  CreditCard, 
  Smartphone, 
  Wallet, 
  CheckCircle2, 
  Loader2, 
  Share2, 
  Download,
  Check
} from 'lucide-react';
import { OrderItem } from '../types';

export default function ClientPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState<'selection' | 'processing' | 'success'>('selection');
  const [method, setMethod] = useState<'MoMo' | 'Moov' | 'Wave' | 'Card' | 'Cash' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const cart = location.state?.cart as OrderItem[] || [];
  const total = location.state?.total || 0;

  if (cart.length === 0 && step !== 'success') {
    return <div className="p-8 text-center font-bold">Votre panier est vide.</div>;
  }

  const handlePay = () => {
    if (!method) return;
    setStep('processing');
    setTimeout(() => setStep('success'), 3000);
  };

  return (
    <div className="min-h-screen bg-surface-2 selection:bg-gold/30 transition-colors duration-500">
      <AnimatePresence mode="wait">
        {step !== 'success' ? (
          <motion.div
            key="payment-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-32"
          >
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl p-6 flex items-center justify-between border-b border-border sticky top-0 z-50">
              <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="w-10 h-10 bg-surface-2 rounded-full flex items-center justify-center text-navy shadow-sm"><ChevronLeft size={20} /></button>
                <h1 className="text-xl font-black text-navy uppercase tracking-tight">Règlement</h1>
              </div>
              <img src="/logo.png" alt="PayDish" className="h-8 w-auto" />
            </div>

            <main className="p-6 max-w-screen-sm mx-auto space-y-10">
               {/* Order Recap Card */}
               <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
                  <span className="section-label mb-6">Récapitulatif</span>
                  <div className="space-y-4 mb-8">
                     {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm font-medium">
                           <span className="text-navy">{item.quantity}x {item.name}</span>
                           <span className="text-ink-muted">{ (item.price * item.quantity).toLocaleString() } FCFA</span>
                        </div>
                     ))}
                  </div>
                  <div className="h-px bg-border mb-6"></div>
                  <div className="flex justify-between items-center">
                     <span className="text-xl font-black text-navy">Total à payer</span>
                     <span className="text-3xl font-black text-gold">{total.toLocaleString()} FCFA</span>
                  </div>
               </div>

               {/* Payment Methods */}
               <div className="space-y-4">
                  <span className="section-label mb-4 px-2">Mode de paiement</span>
                  {[
                    { id: 'MoMo', name: 'MTN Mobile Money', icon: Smartphone, color: 'bg-[#FFCC00]', text: 'text-black' },
                    { id: 'Moov', name: 'Moov Money', icon: Smartphone, color: 'bg-[#007DC5]', text: 'text-white' },
                    { id: 'Wave', name: 'Wave', icon: Wallet, color: 'bg-[#1C51F1]', text: 'text-white' },
                    { id: 'Card', name: 'Carte Bancaire', icon: CreditCard, color: 'bg-navy', text: 'text-white' },
                    { id: 'Cash', name: 'Espèces', icon: Check, color: 'bg-gray-100', text: 'text-gray-600' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id as any)}
                      className={`w-full p-6 rounded-[2rem] border-2 flex items-center gap-5 transition-all duration-300 ${method === m.id ? 'border-gold bg-white shadow-xl shadow-gold/5' : 'border-transparent bg-white shadow-sm hover:shadow-md'}`}
                    >
                      <div className={`${m.color} ${m.text} w-12 h-12 rounded-2xl flex items-center justify-center shadow-md`}>
                        <m.icon size={24} />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-black text-navy text-base">{m.name}</div>
                        <div className="text-[10px] text-ink-muted font-black uppercase tracking-widest">Transaction sécurisée</div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${method === m.id ? 'bg-gold border-gold scale-110 shadow-lg shadow-gold/20' : 'border-border'}`}>
                        {method === m.id && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  ))}
               </div>

               {/* Phone Input Overlay if needed */}
               {(method === 'MoMo' || method === 'Moov' || method === 'Wave') && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-white rounded-[2.5rem] border border-border shadow-sm">
                    <span className="section-label mb-4">Numéro de téléphone</span>
                    <div className="relative">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-ink-muted opacity-40">+229</span>
                       <input 
                         type="tel" 
                         value={phoneNumber}
                         onChange={(e) => setPhoneNumber(e.target.value)}
                         placeholder="00 00 00 00"
                         className="input-premium pl-20"
                       />
                    </div>
                    <p className="mt-4 text-[10px] text-ink-muted font-medium italic leading-relaxed">
                       Un message de confirmation apparaîtra sur votre téléphone pour valider le prélèvement.
                    </p>
                 </motion.div>
               )}
            </main>

            {/* Bottom Pay Button */}
            <div className="fixed bottom-0 inset-x-0 p-8 bg-white/80 backdrop-blur-xl border-t border-border z-40 lg:max-w-screen-sm lg:left-1/2 lg:-translate-x-1/2 lg:rounded-t-[3rem] shadow-2xl">
               <button 
                disabled={!method || (['MoMo', 'Moov', 'Wave'].includes(method) && phoneNumber.length < 8) || step === 'processing'}
                onClick={handlePay}
                className="w-full btn-primary py-6 flex items-center justify-center gap-3 text-lg"
               >
                 {step === 'processing' ? (
                   <>
                    <Loader2 size={24} className="animate-spin text-gold" />
                    Traitement en cours...
                   </>
                 ) : (
                   <>Confirmer le paiement ({total.toLocaleString()} FCFA)</>
                 )}
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="payment-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen bg-navy p-6 flex flex-col items-center justify-center text-white"
          >
            <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mb-10 shadow-2xl animate-float">
              <CheckCircle2 size={48} className="text-navy" />
            </div>
            
            <h1 className="text-4xl font-black mb-4 text-center">Succès !</h1>
            <p className="text-white/60 font-bold mb-16 text-center">Votre paiement a été validé avec succès.</p>

            <div className="w-full max-w-sm bg-white rounded-[3rem] p-10 text-navy shadow-2xl relative overflow-hidden">
               <div className="text-center mb-10">
                  <div className="inline-block bg-gold/10 p-3 rounded-2xl mb-6">
                     <img src="/logo.png" alt="PayDish" className="w-10 h-10 object-contain" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight uppercase">Reçu PayDish</h2>
                  <p className="text-[10px] text-ink-muted font-black uppercase tracking-[0.3em] mt-1">Le Bon Goût — Cotonou</p>
               </div>

               <div className="space-y-4 mb-10 text-xs font-black uppercase tracking-widest text-ink-muted">
                  <div className="flex justify-between"><span>Réf</span><span className="text-navy">#PD-2026-9920</span></div>
                  <div className="flex justify-between"><span>Table</span><span className="text-navy">07</span></div>
                  <div className="flex justify-between"><span>Date</span><span className="text-navy">02 Mai 2026</span></div>
               </div>

               <div className="border-t-2 border-dashed border-border py-8 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm font-bold">
                       <span>{item.quantity}x {item.name}</span>
                       <span className="text-ink-muted">{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
               </div>

               <div className="bg-surface-2 p-6 rounded-3xl mb-10 flex justify-between items-center border border-border">
                  <span className="text-[10px] font-black uppercase tracking-widest text-ink-muted">Montant Payé</span>
                  <span className="text-2xl font-black text-gold">{total.toLocaleString()} FCFA</span>
               </div>

               <div className="flex gap-4">
                  <button className="flex-1 bg-surface-2 p-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-gold hover:text-white transition-all transition-colors"><Share2 size={16} /> Partager</button>
                  <button className="flex-1 bg-navy text-white p-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all"><Download size={16} /> PDF</button>
               </div>

               {/* Receipt notches */}
               <div className="absolute bottom-[-10px] left-0 right-0 flex justify-around">
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => <div key={i} className="w-4 h-4 bg-navy rounded-full"></div>)}
               </div>
            </div>

            <button 
              onClick={() => navigate('/')}
              className="mt-16 text-white/40 hover:text-white text-xs font-black uppercase tracking-[0.3em] transition-colors"
            >
              Retour à l'accueil
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
