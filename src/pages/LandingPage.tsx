/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  QrCode, 
  Utensils, 
  CreditCard, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  Users, 
  ArrowRight, 
  Menu as MenuIcon, 
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Store,
  LayoutDashboard,
  TrendingUp,
  Monitor,
  ShoppingBag,
  UtensilsCrossed,
  Table as TableIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../lib/ThemeToggle';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface selection:bg-gold/30 selection:text-navy transition-colors duration-500">
      {/* Navigation */}
      <nav className={`nav-glass ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <img 
              src="/logo.png" 
              alt="PayDish Logo" 
              className="h-20 w-auto group-hover:scale-105 transition-transform duration-300" 
            />
            <span className="text-4xl font-black tracking-tighter text-ink">PayDish</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[13px] font-black uppercase tracking-widest text-ink-muted">
            <a href="#solutions" className="hover:text-gold transition-colors relative group">Solutions</a>
            <a href="#experience" className="hover:text-gold transition-colors relative group">Découvrir</a>
            <a href="#contact" className="hover:text-gold transition-colors relative group">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <div className="w-[1px] h-6 bg-border mx-2"></div>
            <Link to="/auth" className="text-[13px] font-black uppercase tracking-widest text-ink hover:text-gold transition-colors px-4">Connexion</Link>
            <Link to="/auth?signup=true" className="btn-gold">
              Inscrire mon Restaurant
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-ink p-2">
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-64 lg:pb-64 overflow-hidden">
        <div className="hero-orb bg-gold w-[600px] h-[600px] -top-20 -left-20"></div>
        <div className="hero-orb bg-navy w-[800px] h-[800px] top-1/2 -right-40"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-3 bg-surface-2 border border-border px-6 py-2.5 rounded-full mb-10 shadow-sm">
              <Monitor className="w-4 h-4 text-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink-muted">Plateforme B2B pour Restaurateurs</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-ink leading-[0.95] mb-10 tracking-tight max-w-5xl">
              Digitalisez votre <br /> 
              <span className="text-gold-gradient italic">établissement.</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-ink-muted mb-12 max-w-2xl leading-relaxed font-medium">
              Pilotez votre restaurant avec une précision absolue. Offrez à vos clients la liberté de commander et payer en 10 secondes via QR Code.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-24">
              <Link to="/auth?signup=true" className="btn-gold">
                Démarrer maintenant <ArrowRight size={18} className="ml-2" />
              </Link>
              <a href="#solutions" className="btn-ghost">
                En savoir plus
              </a>
            </div>
          </motion.div>

          {/* MacBook Pro Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full max-w-6xl"
          >
            <div className="relative mx-auto bg-[#0a0a0a] rounded-t-[3rem] p-4 pt-6 shadow-2xl border-x-[12px] border-t-[12px] border-[#333]">
              <div className="macbook-screen">
                <div className="absolute left-0 top-0 bottom-0 w-1/5 bg-navy flex flex-col p-6 border-r border-white/5">
                  <img src="/logo.png" alt="In-App" className="h-10 w-auto mb-10" />
                  <div className="space-y-4">
                    {[LayoutDashboard, ShoppingBag, UtensilsCrossed, TableIcon, CreditCard].map((Icon, i) => (
                      <div key={i} className={`w-full h-10 rounded-xl flex items-center gap-3 px-3 ${i === 0 ? 'bg-gold text-navy' : 'opacity-20 text-white'}`}>
                        <Icon size={18} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ml-[20%] h-20 bg-card-bg border-b border-border flex items-center justify-between px-8"></div>
                <div className="ml-[20%] flex-1 p-8 grid grid-cols-3 gap-6 bg-surface">
                  <div className="col-span-2 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="bg-card-bg p-6 rounded-3xl border border-border h-32"></div>
                      ))}
                    </div>
                    <div className="bg-card-bg p-8 rounded-[2.5rem] border border-border flex-1"></div>
                  </div>
                  <div className="col-span-1 bg-card-bg p-8 rounded-[2.5rem] border border-border space-y-6"></div>
                </div>
              </div>
            </div>
            <div className="mx-auto w-[115%] h-6 bg-[#222] rounded-b-[4rem] relative left-[-7.5%] shadow-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* NEW FEATURE SECTION WITH USER IMAGE */}
      <section id="experience" className="py-40 bg-surface transition-colors duration-500 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative"
             >
               <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-border">
                 <img src="/feature.png" alt="PayDish Experience" className="w-full h-auto scale-105 hover:scale-110 transition-transform duration-700" />
               </div>
               <div className="absolute -bottom-10 -right-10 bg-gold p-8 rounded-[2rem] shadow-2xl z-20 hidden md:block">
                 <p className="text-navy font-black text-4xl tracking-tighter">100%</p>
                 <p className="text-navy/60 text-[10px] font-black uppercase tracking-widest">Connecté</p>
               </div>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
               <h2 className="text-4xl lg:text-6xl font-black text-ink mb-8 tracking-tight leading-none">
                 Redéfinissez l'art de <br />
                 <span className="text-gold-gradient italic">recevoir.</span>
               </h2>
               <p className="text-lg text-ink-muted font-medium leading-relaxed mb-10">
                 Une expérience client fluide, de l'accueil au paiement. PayDish s'intègre naturellement à votre service pour le rendre plus rapide, plus moderne et plus rentable.
               </p>
               <div className="grid grid-cols-2 gap-8 mb-12">
                 <div className="space-y-2">
                   <h4 className="font-black text-ink uppercase text-xs tracking-widest">Rapidité</h4>
                   <p className="text-sm text-ink-muted">Commandes instantanées sans attente.</p>
                 </div>
                 <div className="space-y-2">
                   <h4 className="font-black text-ink uppercase text-xs tracking-widest">Fidélité</h4>
                   <p className="text-sm text-ink-muted">Vos clients reviennent pour le confort.</p>
                 </div>
               </div>
               <Link to="/auth?signup=true" className="btn-gold inline-flex items-center gap-3">
                 Inscrire mon restaurant <ChevronRight size={18} />
               </Link>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-40 bg-card-bg transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center mb-32">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black text-ink mb-10 tracking-tight leading-none">
                L'excellence en <br />
                <span className="text-gold-gradient italic">un scan.</span>
              </h2>
              <div className="space-y-8 mt-12">
                {[
                  "Suivi précis des ventes en temps réel",
                  "Encaissements sécurisés MTN & Moov",
                  "Gestion multi-établissements",
                  "Supports marketing QR inclus"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 font-black text-[13px] uppercase tracking-wider text-ink">
                    <CheckCircle2 className="text-gold" size={24} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: Zap, label: "Instant", desc: "Commandes live" },
                { icon: ShieldCheck, label: "Sécurisé", desc: "Cryptage bancaire" },
                { icon: Globe, label: "Bénin", desc: "Standard 229" },
                { icon: Sparkles, label: "Excellence", desc: "Design Premium" }
              ].map((card, i) => (
                <div key={i} className="card-premium text-center hover-lift bg-surface">
                  <div className="w-16 h-16 bg-surface-2 text-gold rounded-2xl flex items-center justify-center mx-auto mb-8 border border-border shadow-sm">
                    <card.icon size={32} />
                  </div>
                  <h4 className="font-black text-ink mb-2 uppercase tracking-widest text-xs">{card.label}</h4>
                  <p className="text-[10px] text-ink-muted font-black uppercase tracking-tighter">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="bg-navy dark:bg-[#020617] pt-32 pb-12 text-white/90 border-t border-white/5 transition-colors duration-500 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 pb-24">
            <div className="lg:col-span-4 space-y-10">
              <Link to="/" className="flex items-center gap-5 group">
                <img src="/logo.png" alt="PayDish Logo" className="h-20 w-auto group-hover:rotate-3 transition-transform duration-500" />
                <span className="text-4xl font-black text-white tracking-tighter uppercase">PayDish</span>
              </Link>
              <p className="text-sm font-medium text-white/50 leading-relaxed max-w-sm">
                La première plateforme de paiement intelligente dédiée à la restauration au Bénin. Nous transformons chaque table en un point de vente digital.
              </p>
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-gold opacity-60">Partenaires de paiement</p>
                <div className="flex items-center gap-8">
                  <img src="/mtn_logo.png" alt="MTN" className="h-10 w-auto rounded-lg shadow-sm" />
                  <img src="/moov_logo.png" alt="Moov Africa" className="h-10 w-auto" />
                  <img src="https://www.celtiis.bj/wp-content/uploads/2022/10/Logo-Celtiis-Final-01.png" alt="Celtiis" className="h-10 w-auto rounded-lg" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="space-y-8">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Produit</h5>
                <ul className="space-y-4 text-sm font-bold text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">Menu Digital</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Dashboard Resto</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">QR Banners</a></li>
                </ul>
              </div>
              <div className="space-y-8">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Support</h5>
                <ul className="space-y-4 text-sm font-bold text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Développeurs</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            <p>© 2026 PayDish Technologies S.A.</p>
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <p className="text-white/40">Système Opérationnel</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
