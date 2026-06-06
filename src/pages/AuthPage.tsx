/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, 
  Mail, 
  Lock, 
  Phone, 
  User, 
  Store, 
  MapPin, 
  ChevronRight, 
  Upload, 
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ThemeToggle from '../lib/ThemeToggle';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get('signup') === 'true');
  const [loading, setLoading] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0); 
  const navigate = useNavigate();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isSignup) {
        setOnboardingStep(1);
      } else {
        navigate('/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen-dynamic bg-surface-2 flex flex-col items-center justify-center px-4 py-8 sm:p-6 relative overflow-hidden transition-colors duration-500">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between z-50">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="PayDish" className="h-8 sm:h-10 w-auto" />
          <span className="text-lg sm:text-xl font-normal text-forest uppercase font-diplomata">PayDish</span>
        </Link>
        <ThemeToggle />
      </nav>

      <div className="w-full max-w-[480px] z-10 px-0">
        <AnimatePresence mode="wait">
          {onboardingStep === 0 && (
            <motion.div
              key="auth-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-surface-2 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-border"
            >
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-forest mb-2 tracking-tight leading-tight">
                  {isSignup ? 'Créer un compte' : 'Bon retour'}
                </h2>
                <p className="text-ink-muted font-medium text-xs sm:text-sm leading-relaxed max-w-[300px] mx-auto">
                  {isSignup ? 'Rejoignez les meilleurs restaurateurs du Bénin.' : 'Accédez à votre tableau de bord PayDish.'}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {isSignup && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Store className="absolute left-6 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
                      <input required type="text" placeholder="Nom de l'établissement" className="input-premium pl-16 pr-6" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
                      <input required type="tel" placeholder="Numéro de téléphone" className="input-premium pl-16 pr-6" />
                    </div>
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
                  <input required type="email" placeholder="Adresse email" className="input-premium pl-16 pr-6" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
                  <input required type="password" placeholder="Mot de passe" className="input-premium pl-16 pr-6" />
                </div>

                <button 
                  disabled={loading} 
                  className="w-full btn-primary py-4 sm:py-5 flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 text-xs sm:text-[13px]"
                >
                  {loading ? 'Chargement...' : isSignup ? 'Continuer' : 'Se connecter'}
                  {!loading && <ArrowRight size={16} className="sm:hidden" />}
                  {!loading && <ArrowRight size={18} className="hidden sm:block" />}
                </button>
              </form>

              <div className="mt-6 sm:mt-8 text-center">
                <button 
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-xs sm:text-sm font-bold text-ink-muted hover:text-sage transition-colors leading-relaxed"
                >
                  {isSignup ? 'Déjà un compte ? Connectez-vous' : "Pas encore de compte ? S'inscrire"}
                </button>
              </div>
            </motion.div>
          )}

          {onboardingStep === 1 && (
            <OnboardingStep1 onNext={() => setOnboardingStep(2)} />
          )}
          {onboardingStep === 2 && (
            <OnboardingStep2 
              onNext={() => setOnboardingStep(3)} 
              onBack={() => setOnboardingStep(1)} 
            />
          )}
          {onboardingStep === 3 && (
            <OnboardingStep3 onFinish={() => navigate('/dashboard')} />
          )}
        </AnimatePresence>
      </div>
      
      {/* Subtle bottom text */}
      <p className="mt-8 sm:mt-12 mb-6 sm:mb-8 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-ink-muted text-center">
        © 2026 PayDish Technologies S.A.
      </p>
    </div>
  );
}

function OnboardingStep1({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-surface-2 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-border">
      <div className="text-center mb-8 sm:mb-10">
        <span className="section-label">Étape 1 sur 3</span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-forest mb-2 tracking-tight leading-tight">Profil Restaurant</h2>
      </div>
      <div className="space-y-8">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-surface-2 rounded-3xl flex items-center justify-center border-2 border-dashed border-border group cursor-pointer hover:border-sage transition-all duration-300 relative overflow-hidden">
            <Upload className="text-ink-muted group-hover:text-sage transition-colors" size={32} />
          </div>
          <p className="mt-4 text-[10px] font-black uppercase text-ink-muted tracking-widest">Logo de l'établissement</p>
        </div>
        
        <input type="text" placeholder="Adresse physique" className="input-premium px-6" />
        <textarea placeholder="Description de votre restaurant..." className="input-premium min-h-[120px] pt-4 px-6"></textarea>

        <button onClick={onNext} className="w-full btn-primary py-5 flex items-center justify-center gap-3">
          Suivant <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

function OnboardingStep2({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-surface-2 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-border">
      <button onClick={onBack} className="flex items-center gap-2 text-ink-muted hover:text-sage transition-colors mb-8 text-xs font-bold uppercase tracking-widest">
        <ChevronLeft size={16} /> Retour
      </button>
      <div className="text-center mb-8 sm:mb-10">
        <span className="section-label">Étape 2 sur 3</span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-forest mb-2 tracking-tight leading-tight">Configuration Menu</h2>
        <p className="text-ink-muted text-xs sm:text-sm font-medium leading-relaxed">Vous pourrez finaliser votre menu complet plus tard.</p>
      </div>
      
      <div className="space-y-4 mb-10">
        <div className="p-5 bg-surface-2 rounded-2xl border border-border border-dashed text-center">
           <p className="text-sm font-bold text-ink-muted">Menu vide pour l'instant</p>
        </div>
        <button className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-[10px] font-black text-ink-muted uppercase tracking-widest hover:border-sage hover:text-sage transition-all">
          + Ajouter un plat
        </button>
      </div>

      <button onClick={onNext} className="w-full btn-primary py-5 flex items-center justify-center gap-3">
        Finaliser <ArrowRight size={18} />
      </button>
    </motion.div>
  );
}

function OnboardingStep3({ onFinish }: { onFinish: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface-2 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-border text-center">
      <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 size={40} />
      </div>
      
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-forest mb-3 sm:mb-4 tracking-tight leading-tight">Tout est prêt !</h2>
      <p className="text-ink-muted font-medium text-xs sm:text-sm leading-relaxed mb-8 sm:mb-10 max-w-[280px] mx-auto">Votre restaurant est maintenant membre du réseau PayDish. Commençons à servir vos clients.</p>
      
      <div className="p-6 bg-forest text-white rounded-3xl mb-10 flex items-center gap-5 text-left border border-white/5">
        <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center text-forest">
          <QrCode size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase text-sage tracking-widest">Badge PayDish</p>
          <p className="text-base font-bold">Système QR activé</p>
        </div>
      </div>

      <button onClick={onFinish} className="w-full btn-cafe py-5 flex items-center justify-center gap-3 mb-6">
        Accéder au Dashboard <Sparkles size={18} />
      </button>
    </motion.div>
  );
}
