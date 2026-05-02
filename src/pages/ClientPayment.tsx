/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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
  QrCode as QrIcon,
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
    return <div className="p-8 text-center">Panier vide. <button onClick={() => navigate(-1)} className="text-brand-green font-bold">Retour</button></div>;
  }

  const handlePay = () => {
    if (!method) return;
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {step !== 'success' ? (
          <motion.div
            key="payment-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-32"
          >
            {/* Header */}
            <div className="bg-white p-4 flex items-center gap-4 border-b border-gray-100">
              <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full"><ChevronLeft className="w-6 h-6" /></button>
              <h1 className="text-xl font-black text-brand-dark">Paiement</h1>
            </div>

            <main className="p-6 max-w-screen-sm mx-auto space-y-8">
              {/* Order Recap */}
              <div className="bg-white p-6 rounded-[32px] shadow-soft border border-gray-100">
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Récapitulatif</div>
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="font-bold text-brand-dark">{item.quantity}x {item.name}</div>
                      <div className="text-gray-500 font-medium">{ (item.price * item.quantity).toLocaleString() } FCFA</div>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gray-100 mb-4"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-brand-dark">À régler</span>
                  <span className="text-2xl font-black text-brand-green">{total.toLocaleString()} FCFA</span>
                </div>
              </div>

              {/* Methods */}
              <div className="space-y-4">
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Méthode de paiement</div>
                {[
                  { id: 'MoMo', name: 'MTN Mobile Money', icon: Smartphone, color: 'bg-[#FFCC00]', text: 'text-black' },
                  { id: 'Moov', name: 'Moov Money', icon: Smartphone, color: 'bg-[#007DC5]', text: 'text-white' },
                  { id: 'Wave', name: 'Wave', icon: Wallet, color: 'bg-[#1C51F1]', text: 'text-white' },
                  { id: 'Card', name: 'Carte bancaire', icon: CreditCard, color: 'bg-brand-dark', text: 'text-white' },
                  { id: 'Cash', name: 'Espèces à la caisse', icon: Check, color: 'bg-gray-200', text: 'text-gray-600' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id as any)}
                    className={`w-full p-5 rounded-[24px] border-2 flex items-center gap-4 transition-all ${method === m.id ? 'border-brand-green bg-white' : 'border-transparent bg-white shadow-soft'}`}
                  >
                    <div className={`${m.color} ${m.text} w-12 h-12 rounded-xl flex items-center justify-center shadow-sm`}>
                      <m.icon className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-black text-brand-dark text-base">{m.name}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Sécurisé & Instantané</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${method === m.id ? 'bg-brand-green border-brand-green' : 'border-gray-200'}`}>
                      {method === m.id && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Conditional Inputs */}
              {(method === 'MoMo' || method === 'Moov' || method === 'Wave') && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-white rounded-[32px] border border-gray-100 shadow-soft">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Votre numéro {method}</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">+229</div>
                    <input 
                      type="tel" 
                      placeholder="Numéro de téléphone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-16 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-brand-green/20" 
                    />
                  </div>
                  <p className="mt-4 text-[10px] text-gray-500 font-medium leading-relaxed italic">
                    Une demande de confirmation sera envoyée directement sur votre téléphone après avoir cliqué sur le bouton ci-dessous.
                  </p>
                </motion.div>
              )}
            </main>

            {/* Fixed Button Bar */}
            <div className="fixed bottom-0 inset-x-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40 lg:max-w-screen-sm lg:left-1/2 lg:-translate-x-1/2 lg:rounded-t-[32px]">
               <button 
                disabled={!method || (['MoMo', 'Moov', 'Wave'].includes(method) && phoneNumber.length < 8)}
                onClick={handlePay}
                className="w-full bg-brand-green text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-brand-green/20 hover:opacity-90 disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-3"
               >
                 {step === 'processing' ? (
                   <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Traitement...
                   </>
                 ) : (
                   <>Confirmer & Payer {total.toLocaleString()} FCFA</>
                 )}
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-receipt"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="min-h-screen bg-brand-green p-6 flex flex-col items-center justify-center text-white"
          >
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 animate-bounce">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
            
            <h1 className="text-4xl font-black mb-2 text-center">Paiement Réussi !</h1>
            <p className="text-white/80 font-bold mb-12 text-center">Votre commande est en préparation.</p>

            {/* Digital Receipt */}
            <div className="w-full max-w-sm bg-white rounded-[40px] p-8 text-brand-dark shadow-2xl relative overflow-hidden">
               {/* Receipt header */}
               <div className="text-center mb-8">
                 <div className="inline-block bg-brand-green/10 p-2 rounded-xl mb-4">
                    <QrIcon className="text-brand-green w-8 h-8" />
                 </div>
                 <h2 className="text-2xl font-black">PayDish Reçu</h2>
                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Le Bon Goût — Cotonou</p>
               </div>

               <div className="space-y-4 mb-8">
                 <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-tight">
                   <span>N° COMMANDE</span>
                   <span className="text-brand-dark">#PD-20251023-0042</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-tight">
                   <span>TABLE</span>
                   <span className="text-brand-dark">7</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-tight">
                   <span>DATE</span>
                   <span className="text-brand-dark">02 Mai 2026, 17:05</span>
                 </div>
               </div>

               <div className="dash-line h-px bg-gray-100 mb-8 border-t-2 border-dashed border-gray-100"></div>

               <div className="space-y-3 mb-8">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="font-bold">{item.quantity}x {item.name}</span>
                      <span className="font-medium text-gray-500">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                    </div>
                  ))}
               </div>

               <div className="bg-gray-50 p-6 rounded-3xl mb-8">
                 <div className="flex justify-between items-center">
                    <span className="font-black text-gray-400 uppercase text-[10px] tracking-widest">Total Payé</span>
                    <span className="text-2xl font-black text-brand-green">{total.toLocaleString()} FCFA</span>
                 </div>
               </div>

               <div className="flex gap-4">
                 <button className="flex-1 bg-gray-100 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm">
                   <Share2 className="w-4 h-4" /> Partager
                 </button>
                 <button className="flex-1 bg-brand-dark text-white p-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm">
                   <Download className="w-4 h-4" /> PDF
                 </button>
               </div>

               {/* Decorative receipt notches */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-brand-green/10 rounded-b-xl"></div>
               <div className="absolute bottom-[-10px] left-0 right-0 flex justify-between px-2">
                 {[1,2,3,4,5,6,7,8,9,10].map(i => (
                   <div key={i} className="w-4 h-4 bg-brand-green rounded-full"></div>
                 ))}
               </div>
            </div>

            <button 
              onClick={() => navigate('/')}
              className="mt-12 text-white font-bold underline underline-offset-8 decoration-2 decoration-white/40 hover:text-white/80 transition-colors"
            >
              Retourner à l'accueil
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
