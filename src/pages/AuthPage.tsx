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
  Clock, 
  Plus, 
  Trash2, 
  ChevronLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ThemeToggle from '../lib/ThemeToggle';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get('signup') === 'true');
  const [loading, setLoading] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0); 
  const navigate = useNavigate();

  // Input states
  const [phone, setPhone] = useState('+229 ');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.startsWith('+229 ')) {
      setPhone(value);
    } else if (value.length < 5) {
      setPhone('+229 ');
    }
  };

  const validateEmail = (val: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(val);
    if (val.length > 0) {
      setEmailError(!regex.test(val));
    } else {
      setEmailError(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError) return;
    
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
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
      {/* Floating Theme Toggle */}
      <div className="absolute top-12 right-12 z-50">
        <ThemeToggle />
      </div>

      {/* Background Orbs */}
      <div className="hero-orb bg-gold w-[500px] h-[500px] -top-20 -right-20"></div>
      <div className="hero-orb bg-navy w-[600px] h-[600px] -bottom-20 -left-20"></div>

      <Link to="/" className="flex flex-col items-center gap-4 mb-16 group z-10">
        <img src="/logo.png" alt="PayDish Logo" className="h-28 w-auto group-hover:scale-105 transition-transform duration-500" />
        <span className="text-4xl font-black tracking-tighter text-ink uppercase">PayDish</span>
      </Link>

      <div className="w-full max-w-[500px] z-10">
        <AnimatePresence mode="wait">
          {onboardingStep === 0 && (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="card-premium bg-card-bg border-none shadow-2xl p-10"
            >
              <div className="flex bg-surface-2 p-1.5 rounded-2xl mb-12 border border-border">
                <button
                  onClick={() => setIsSignup(false)}
                  className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${!isSignup ? 'bg-gold text-navy shadow-lg' : 'text-ink-muted hover:text-ink'}`}
                >
                  Connexion
                </button>
                <button
                  onClick={() => setIsSignup(true)}
                  className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${isSignup ? 'bg-gold text-navy shadow-lg' : 'text-ink-muted hover:text-ink'}`}
                >
                  Inscription
                </button>
              </div>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-ink mb-2 tracking-tighter">
                  {isSignup ? 'Devenir Partenaire' : 'Bon retour'}
                </h2>
                <p className="text-ink-muted font-bold text-xs">
                  {isSignup ? "Rejoignez l'élite de la restauration béninoise." : 'Accédez à votre espace restaurateur.'}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-5">
                {isSignup && (
                  <>
                    <div className="relative group">
                      <Store className="absolute left-6 top-1/2 -translate-y-1/2 text-ink-muted group-focus-within:text-gold transition-colors" size={20} />
                      <input required type="text" placeholder="Nom de l'établissement" className="input-premium input-with-icon" />
                    </div>
                    <div className="relative group">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-ink-muted group-focus-within:text-gold transition-colors" size={20} />
                      <input 
                        required 
                        type="tel" 
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+229 Numéro de téléphone" 
                        className="input-premium input-with-icon" 
                      />
                    </div>
                  </>
                )}
                <div className="relative group">
                  <Mail className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${emailError ? 'text-danger' : 'text-ink-muted group-focus-within:text-gold'}`} size={20} />
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    placeholder="Adresse email" 
                    className={`input-premium input-with-icon ${emailError ? 'border-danger! ring-4 ring-danger/10' : ''}`} 
                  />
                  {emailError && <p className="text-[10px] font-bold text-danger mt-2 ml-2">Veuillez entrer une adresse email valide</p>}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-ink-muted group-focus-within:text-gold transition-colors" size={20} />
                  <input required type="password" placeholder="Mot de passe" className="input-premium input-with-icon" />
                </div>

                <button 
                  disabled={loading || emailError} 
                  className="w-full btn-gold py-6 flex items-center justify-center gap-4 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Chargement..' : isSignup ? 'Suivant' : 'Se connecter'}
                  {!loading && <ChevronRight size={20} />}
                </button>
              </form>
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
    </div>
  );
}

function OnboardingStep1({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="card-premium bg-card-bg border-none shadow-2xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-ink mb-4 tracking-tighter">Profil du Restaurant</h2>
        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
      </div>
      <div className="space-y-8">
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 bg-surface-2 rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-border group cursor-pointer hover:border-gold transition-all duration-500 relative overflow-hidden">
            <Upload className="text-ink-muted group-hover:text-gold group-hover:scale-110 transition-all" size={40} />
            <div className="absolute inset-0 bg-navy/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-[10px] font-black text-gold uppercase tracking-widest">Modifier le Logo</span>
            </div>
          </div>
        </div>
        
        <input type="text" placeholder="Adresse physique (Google Maps)" className="input-premium" />
        <textarea placeholder="Description courte de votre établissement..." className="input-premium min-h-[140px] pt-5"></textarea>

        <button onClick={onNext} className="w-full btn-gold py-6 flex items-center justify-center gap-4">
          Suivant <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

function OnboardingStep2({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="card-premium bg-card-bg border-none shadow-2xl">
      <button onClick={onBack} className="text-[10px] font-black text-ink-muted uppercase tracking-widest flex items-center gap-2 mb-10 hover:text-gold transition-colors">
        <ChevronLeft size={16} /> Retour
      </button>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-ink mb-4 tracking-tighter">Votre Menu</h2>
        <p className="text-ink-muted font-bold text-sm">Ajoutez vos plats signatures.</p>
      </div>
      
      <div className="space-y-6 mb-12">
        {[1, 2].map(i => (
          <div key={i} className="p-6 bg-surface-2 rounded-2xl border border-border">
            <div className="flex justify-between items-center">
               <div className="h-4 w-40 bg-ink opacity-10 rounded-full"></div>
               <div className="h-4 w-20 bg-gold/20 rounded-full"></div>
            </div>
          </div>
        ))}
        <button className="w-full py-5 border-2 border-dashed border-border rounded-2xl text-[10px] font-black text-ink-muted uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
          <Plus size={20} className="mx-auto mb-2" /> Ajouter un plat
        </button>
      </div>

      <button onClick={onNext} className="w-full btn-gold py-6 flex items-center justify-center gap-4">
        Suivant <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}

function OnboardingStep3({ onFinish }: { onFinish: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="card-premium bg-card-bg border-none shadow-2xl text-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-ink mb-4 tracking-tighter">Félicitations !</h2>
        <p className="text-ink-muted font-bold text-sm">Votre restaurant est prêt à briller.</p>
      </div>
      
      <div className="w-32 h-32 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-12">
        <CheckCircle2 size={64} />
      </div>

      <div className="p-8 bg-navy text-white rounded-3xl mb-12 flex items-center gap-6 text-left border border-white/5 shadow-2xl">
        <div className="w-16 h-16 bg-white rounded-2xl p-3">
          <QrCode className="w-full h-full text-navy" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-gold mb-1">Badge PayDish</p>
          <p className="text-lg font-black tracking-tight">QR de Table activé</p>
        </div>
      </div>

      <button onClick={onFinish} className="w-full btn-gold py-6 flex items-center justify-center gap-4 mb-6">
        Accéder à mon Dashboard <Sparkles size={20} />
      </button>
      <p className="text-[10px] text-ink-muted font-black uppercase tracking-widest">Propulsé par PayDish Bénin</p>
    </motion.div>
  );
}
