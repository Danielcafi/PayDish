/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, Mail, Lock, Phone, User, Store, MapPin, ChevronRight, Upload, Clock, Plus, Trash2, Eye } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get('signup') === 'true');
  const [loading, setLoading] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0); // 0: Auth, 1: Restaurant Info, 2: Menu, 3: QR Codes
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Link to="/" className="flex items-center gap-2 mb-12">
        <div className="bg-brand-green p-1.5 rounded-lg">
          <QrCode className="text-white w-8 h-8" />
        </div>
        <span className="text-3xl font-bold tracking-tight text-brand-dark">PayDish</span>
      </Link>

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {onboardingStep === 0 && (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-3xl shadow-soft"
            >
              <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
                <button
                  onClick={() => setIsSignup(false)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isSignup ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500'}`}
                >
                  Connexion
                </button>
                <button
                  onClick={() => setIsSignup(true)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isSignup ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500'}`}
                >
                  Inscription
                </button>
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">
                {isSignup ? 'Devenir partenaire' : 'Bon retour !'}
              </h2>
              <p className="text-gray-500 text-center mb-8 text-sm">
                {isSignup ? "Commencez l'aventure PayDish aujourd'hui." : 'Accédez à votre tableau de bord.'}
              </p>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {isSignup && (
                  <>
                    <div className="relative">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input required type="text" placeholder="Nom du restaurant" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all" />
                    </div>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input required type="text" placeholder="Prénom et Nom du gérant" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input required type="tel" placeholder="+229 Numéro de téléphone" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all" />
                    </div>
                  </>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input required type="email" placeholder="Email" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input required type="password" placeholder="Mot de passe" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none transition-all" />
                </div>

                {!isSignup && (
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-brand-green w-4 h-4" />
                      <span className="text-gray-600 font-medium tracking-tight">Se souvenir de moi</span>
                    </label>
                    <a href="#" className="text-brand-green font-bold hover:underline">Mot de passe oublié ?</a>
                  </div>
                )}

                <button disabled={loading} className="w-full bg-brand-green text-white py-4 rounded-xl font-bold shadow-lg shadow-brand-green/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  {loading ? 'Traitement...' : isSignup ? 'Créer mon compte' : 'Me connecter'}
                  {!loading && <ChevronRight className="w-5 h-5" />}
                </button>
              </form>
            </motion.div>
          )}

          {onboardingStep === 1 && (
            <OnboardingStep1 onNext={() => setOnboardingStep(2)} />
          )}
          {onboardingStep === 2 && (
            <OnboardingStep2 onNext={() => setOnboardingStep(3)} />
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
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-3xl shadow-soft">
      <h2 className="text-2xl font-bold mb-6">Étape 1 — Profil du restaurant</h2>
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden group cursor-pointer hover:border-brand-green transition-colors">
            <Upload className="text-gray-400 group-hover:text-brand-green" />
            <div className="absolute bottom-0 left-0 right-0 bg-brand-green text-white text-[10px] font-bold py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              LOGO
            </div>
          </div>
          <span className="text-xs text-gray-500 mt-2">Cliquez pour charger votre logo</span>
        </div>
        <textarea placeholder="Brève description de votre restaurant..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-green/20 h-24"></textarea>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Adresse complète" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl" />
        </div>
        <div className="relative">
          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Horaires d'ouverture (ex: 11h - 23h)" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl" />
        </div>
        <button onClick={onNext} className="w-full bg-brand-green text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
          Suivant
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

function OnboardingStep2({ onNext }: { onNext: () => void }) {
  const [plates, setPlates] = useState([{ id: 1, name: '', price: '' }]);
  
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-3xl shadow-soft">
      <h2 className="text-2xl font-bold mb-4">Étape 2 — Créer le menu</h2>
      <p className="text-gray-500 text-sm mb-6">Ajoutez vos premiers plats pour commencer. Vous pourrez en ajouter plus tard.</p>
      
      <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto p-1">
        {plates.map((plate, index) => (
          <div key={plate.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Nom du plat" className="col-span-1 p-2 bg-white rounded-lg border border-gray-200 text-sm" />
              <input placeholder="Prix (FCFA)" className="col-span-1 p-2 bg-white rounded-lg border border-gray-200 text-sm" />
            </div>
            {index > 0 && (
              <button onClick={() => setPlates(plates.filter(p => p.id !== plate.id))} className="absolute -right-2 -top-2 bg-red-100 text-red-500 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setPlates([...plates, { id: Date.now(), name: '', price: '' }])}
        className="w-full py-3 border-2 border-dashed border-gray-200 text-gray-500 rounded-xl mb-6 flex items-center justify-center gap-2 hover:border-brand-green hover:text-brand-green transition-colors font-semibold"
      >
        <Plus className="w-5 h-5" />
        Ajouter un plat
      </button>

      <button onClick={onNext} className="w-full bg-brand-green text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20">
        Suivant
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function OnboardingStep3({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(10);
  
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-3xl shadow-soft text-center">
      <div className="w-20 h-20 bg-brand-green/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <QrCode className="text-brand-green w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Étape 3 — Générer les QR codes</h2>
      <p className="text-gray-500 text-sm mb-8">Déterminez le nombre de tables dans votre restaurant pour générer vos supports PayDish.</p>
      
      <div className="flex items-center justify-center gap-8 mb-10">
        <button onClick={() => setCount(Math.max(1, count - 1))} className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-bold">-</button>
        <div className="text-4xl font-extrabold">{count}</div>
        <button onClick={() => setCount(count + 1)} className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-bold">+</button>
      </div>

      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-8 flex items-center gap-4 text-left">
        <div className="w-12 h-12 bg-white rounded-lg p-2 border border-brand-green/30">
          <QrCode className="w-full h-full text-brand-dark" />
        </div>
        <div>
          <div className="font-bold text-sm">Table 7 — PayDish</div>
          <div className="text-[10px] text-gray-500 font-medium tracking-tight">Prêt pour impression PDF</div>
        </div>
        <button className="ml-auto text-brand-green font-bold text-xs uppercase tracking-wider">Aperçu</button>
      </div>

      <button onClick={onFinish} className="w-full bg-brand-green text-white py-4 rounded-xl font-bold mb-4 shadow-lg shadow-brand-green/20">
        Terminer et accéder au tableau de bord
      </button>
      <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Propulsé par PayDish Bénin</p>
    </motion.div>
  );
}
