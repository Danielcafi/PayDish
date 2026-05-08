/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  QrCode, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Menu as MenuIcon, 
  X,
  ShieldCheck,
  Zap,
  Globe,
  Star,
  Users,
  CreditCard,
  Clock,
  Heart,
  TrendingUp,
  MoreVertical
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../lib/ThemeToggle';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface selection:bg-gold/30 transition-colors duration-500">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 glass-morphism' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="PayDish Logo" 
              className="h-10 md:h-12 w-auto transition-transform duration-500 group-hover:scale-110" 
            />
            <span className="text-xl md:text-2xl font-black tracking-tighter text-navy uppercase">PayDish</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            <a href="#solutions" className="nav-link">Nos Atouts</a>
            <a href="#experience" className="nav-link">L'Expérience</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link to="/auth" className="text-sm font-bold text-ink hover:text-gold transition-colors">Connexion</Link>
            <Link to="/auth?signup=true" className="btn-primary">
              Devenir Partenaire
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-navy">
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full"></div>
           <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-navy/5 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">L'Excellence Opérationnelle</span>
            <h1 className="hero-title mb-8">
              Redéfinissez <br />
              <span className="text-gold">l'expérience</span><br />
              de vos clients.
            </h1>
            <p className="text-lg md:text-xl text-ink-muted mb-12 max-w-lg leading-relaxed">
              Plus qu'un simple paiement, PayDish est le partenaire digital des restaurateurs ambitieux. Offrez la fluidité que vos clients méritent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth?signup=true" className="btn-gold px-12 py-5 flex items-center justify-center gap-3">
                Démarrer maintenant <ArrowRight size={18} />
              </Link>
              <a href="#solutions" className="btn-outline px-12 py-5 flex items-center justify-center">
                Découvrir les avantages
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 animate-float">
               <div className="p-4 bg-white rounded-[3rem] shadow-2xl border border-border">
                  <div className="rounded-[2.5rem] overflow-hidden">
                     <img src="/hero-payment.png" alt="Client paying with QR" className="w-full h-auto" />
                  </div>
               </div>
            </div>
            
            {/* Floating Trust Badge */}
            <div className="absolute -bottom-10 -left-10 glass-morphism p-6 rounded-3xl shadow-xl z-20">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                     <Heart size={24} fill="currentColor" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-ink-muted">Approuvé par</p>
                     <p className="font-bold text-sm">200+ Restaurateurs</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why PayDish? - Core Interests */}
      <section id="solutions" className="py-40 bg-surface-2 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
            <span className="section-label">Pourquoi PayDish ?</span>
            <h2 className="text-4xl md:text-6xl font-black text-navy tracking-tight mb-8">Les intérêts de notre solution.</h2>
            <p className="text-ink-muted max-w-2xl mx-auto font-medium">Nous avons conçu PayDish pour répondre aux défis réels des restaurateurs d'aujourd'hui.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                icon: Clock, 
                title: "Gain de Temps Record", 
                desc: "Supprimez l'attente pour le menu et l'addition. Vos serveurs se concentrent sur la qualité du service, pas sur l'encaissement.",
                color: "bg-blue-50 text-blue-600"
              },
              { 
                icon: TrendingUp, 
                title: "Rotation Accélérée", 
                desc: "En libérant vos clients plus rapidement du processus de paiement, vous augmentez la disponibilité de vos tables de 20% en moyenne.",
                color: "bg-green-50 text-green-600"
              },
              { 
                icon: ShieldCheck, 
                title: "Sécurité Béninoise", 
                desc: "Intégration native avec MTN MoMo, Moov Money et Wave. Vos transactions sont sécurisées et votre trésorerie est protégée.",
                color: "bg-gold/10 text-gold"
              },
              { 
                icon: Zap, 
                title: "Simplicité Absolue", 
                desc: "Pas d'application à télécharger pour vos clients. Un simple scan suffit pour accéder au menu et payer en 10 secondes.",
                color: "bg-purple-50 text-purple-600"
              },
              { 
                icon: Star, 
                title: "Image de Marque", 
                desc: "Positionnez votre établissement comme un lieu moderne et technologique. Un menu digital visuel incite à 15% de commandes en plus.",
                color: "bg-orange-50 text-orange-600"
              },
              { 
                icon: Users, 
                title: "Focus Client", 
                desc: "Moins de stress opérationnel signifie un personnel plus souriant et des clients mieux accompagnés tout au long de leur repas.",
                color: "bg-pink-50 text-pink-600"
              }
            ].map((interest, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <div className={`w-14 h-14 ${interest.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110`}>
                  <interest.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-navy mb-4">{interest.title}</h3>
                <p className="text-ink-muted leading-relaxed text-sm font-medium">{interest.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - With New Image */}
      <section id="experience" className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="p-4 bg-white rounded-[4rem] shadow-2xl border border-border overflow-hidden">
                <img src="/menu-experience.png" alt="Digital Menu Experience" className="w-full h-auto rounded-[3.5rem]" />
              </div>
              {/* Floating Overlay */}
              <div className="absolute top-1/2 -right-16 bg-navy text-white p-8 rounded-[2rem] shadow-2xl hidden xl:block">
                 <p className="text-gold font-black text-4xl mb-1">+15%</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Ventes Additionnelles</p>
              </div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <span className="section-label">L'Expérience Mobile</span>
              <h2 className="text-4xl md:text-6xl font-black text-navy mb-8 leading-tight">
                La beauté du <br />
                <span className="text-gold">numérique.</span>
              </h2>
              <p className="text-lg text-ink-muted mb-10 leading-relaxed font-medium">
                Offrez à vos clients un menu visuel haute définition directement sur leur téléphone. Des images qui donnent faim, des descriptions claires et un processus de commande intuitif.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                 <div className="space-y-2">
                    <h4 className="font-black text-navy uppercase text-xs tracking-widest">Zéro App</h4>
                    <p className="text-xs text-ink-muted font-medium">Fonctionne instantanément dans n'importe quel navigateur mobile.</p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="font-black text-navy uppercase text-xs tracking-widest">Multi-Langue</h4>
                    <p className="text-xs text-ink-muted font-medium">Accueillez vos clients internationaux avec des menus traduits.</p>
                 </div>
              </div>
              <Link to="/auth?signup=true" className="btn-primary inline-flex items-center gap-3 px-12">
                Inscrire mon établissement <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-surface">
         <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="bg-navy rounded-[4rem] p-16 md:p-24 relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">Prêt à moderniser votre service ?</h2>
                  <p className="text-white/60 mb-12 max-w-xl mx-auto font-medium">Rejoignez le réseau PayDish et offrez à vos clients la liberté qu'ils attendent.</p>
                  <Link to="/auth?signup=true" className="btn-gold px-12 py-5 inline-flex items-center gap-3">
                     Démarrer gratuitement <ArrowRight size={18} />
                  </Link>
               </div>
               <div className="absolute top-0 left-0 w-full h-full bg-gold/5 pointer-events-none"></div>
               <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-gold/10 blur-[100px] rounded-full"></div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-navy pt-32 pb-12 text-white/90">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 pb-24 border-b border-white/5">
            <div className="lg:col-span-4 space-y-8">
              <Link to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="PayDish Logo" className="h-10 w-auto" />
                <span className="text-2xl font-black tracking-tighter text-white uppercase">PayDish</span>
              </Link>
              <p className="text-white/50 leading-relaxed max-w-sm font-medium">
                La solution digitale de référence pour la restauration au Bénin. Simplifier, sécuriser, valoriser.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-gold mb-8">Solution</h5>
                <ul className="space-y-4 text-sm font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">Menu QR</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Gestion Commandes</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Paiement Mobile</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-gold mb-8">Partenariat</h5>
                <ul className="space-y-4 text-sm font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">Devenir Partenaire</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Témoignages</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-gold mb-8">Légal</h5>
                <ul className="space-y-4 text-sm font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">Mentions Légales</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">CGV</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/20">
            <p>© 2026 PayDish Technologies S.A. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
