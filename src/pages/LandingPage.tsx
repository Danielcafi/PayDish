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
    <div className="min-h-screen-dynamic-dynamic bg-surface selection:bg-sage/30 transition-colors duration-500">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 glass-morphism' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="PayDish Logo" 
              className="h-10 md:h-12 w-auto transition-transform duration-500 group-hover:scale-110" 
            />
            <span className="text-xl md:text-2xl font-normal tracking-tighter text-forest uppercase font-diplomata">PayDish</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            <a href="#solutions" className="nav-link">Nos Atouts</a>
            <a href="#experience" className="nav-link">L'Expérience</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link to="/auth" className="text-sm font-bold text-ink hover:text-sage transition-colors">Connexion</Link>
            <Link to="/auth?signup=true" className="btn-primary">
              Devenir Partenaire
            </Link>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-forest p-2 hover:bg-forest/5 rounded-xl transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <motion.div 
          initial={false}
          animate={mobileMenuOpen ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-40 lg:hidden bg-surface flex flex-col pt-32 px-6"
        >
          <div className="flex flex-col gap-8 text-center">
            <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-normal text-forest font-diplomata">Nos Atouts</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-normal text-forest font-diplomata">L'Expérience</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-normal text-forest font-diplomata">Contact</a>
            <div className="h-[1px] bg-border w-1/4 mx-auto my-4"></div>
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-ink">Connexion</Link>
            <Link to="/auth?signup=true" onClick={() => setMobileMenuOpen(false)} className="btn-primary py-6">
              Devenir Partenaire
            </Link>
            <div className="flex justify-center pt-4">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen-dynamic-dynamic flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-sage/5 dark:bg-sage/10 blur-[120px] rounded-full transition-colors duration-1000"></div>
           <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-forest/5 dark:bg-forest/10 blur-[150px] rounded-full transition-colors duration-1000"></div>
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
              <span className="text-sage">l'expérience</span><br />
              de vos clients.
            </h1>
            <p className="text-lg md:text-xl text-ink-muted mb-12 max-w-lg leading-relaxed">
              Plus qu'un simple paiement, PayDish est le partenaire digital des restaurateurs ambitieux. Offrez la fluidité que vos clients méritent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth?signup=true" className="btn-cafe px-12 py-5 flex items-center justify-center gap-3">
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
                  <div className="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center text-sage">
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
            <h2 className="text-4xl md:text-6xl font-normal text-forest tracking-tight mb-8">Les intérêts de notre solution.</h2>
            <p className="text-ink-muted max-w-2xl mx-auto font-medium">Nous avons conçu PayDish pour répondre aux défis réels des restaurateurs d'aujourd'hui.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                icon: Clock, 
                title: "Gain de Temps Record", 
                desc: "Supprimez l'attente pour le menu et l'addition. Vos serveurs se concentrent sur la qualité du service, pas sur l'encaissement.",
                bgColor: "bg-blue-50/50",
                darkBg: "dark:bg-blue-900/20",
                iconColor: "text-blue-600 dark:text-blue-400"
              },
              { 
                icon: TrendingUp, 
                title: "Rotation Accélérée", 
                desc: "En libérant vos clients plus rapidement du processus de paiement, vous augmentez la disponibilité de vos tables de 20% en moyenne.",
                bgColor: "bg-green-50/50",
                darkBg: "dark:bg-green-900/20",
                iconColor: "text-green-600 dark:text-green-400"
              },
              { 
                icon: ShieldCheck, 
                title: "Sécurité Béninoise", 
                desc: "Intégration native avec MTN MoMo, Moov Money et Wave. Vos transactions sont sécurisées et votre trésorerie est protégée.",
                bgColor: "bg-sage/10",
                darkBg: "dark:bg-sage/20",
                iconColor: "text-sage"
              },
              { 
                icon: Zap, 
                title: "Simplicité Absolue", 
                desc: "Pas d'application à télécharger pour vos clients. Un simple scan suffit pour accéder au menu et payer en 10 secondes.",
                bgColor: "bg-purple-50/50",
                darkBg: "dark:bg-purple-900/20",
                iconColor: "text-purple-600 dark:text-purple-400"
              },
              { 
                icon: Star, 
                title: "Image de Marque", 
                desc: "Positionnez votre établissement comme un lieu moderne et technologique. Un menu digital visuel incite à 15% de commandes en plus.",
                bgColor: "bg-orange-50/50",
                darkBg: "dark:bg-orange-900/20",
                iconColor: "text-orange-600 dark:text-orange-400"
              },
              { 
                icon: Users, 
                title: "Focus Client", 
                desc: "Moins de stress opérationnel signifie un personnel plus souriant et des clients mieux accompagnés tout au long de leur repas.",
                bgColor: "bg-pink-50/50",
                darkBg: "dark:bg-pink-900/20",
                iconColor: "text-pink-600 dark:text-pink-400"
              }
            ].map((interest, i) => (
              <div 
                key={i} 
                className="p-10 rounded-[2.5rem] border border-border transition-all duration-500 bg-surface-2 dark:bg-card-bg group relative overflow-hidden"
              >
                <div className={`w-14 h-14 ${interest.bgColor} ${interest.darkBg} ${interest.iconColor} rounded-2xl flex items-center justify-center mb-8 relative z-10`}>
                  <interest.icon size={28} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-normal text-forest mb-4 dark:text-cream">{interest.title}</h3>
                  <p className="text-ink-muted leading-relaxed text-sm font-medium dark:text-ink-muted/80">{interest.desc}</p>
                </div>
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
              <div className="absolute top-1/2 -right-16 bg-forest text-white p-8 rounded-[2rem] shadow-2xl hidden xl:block">
                 <p className="text-sage font-normal text-4xl mb-1 font-diplomata">+15%</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Ventes Additionnelles</p>
              </div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <span className="section-label">L'Expérience Mobile</span>
              <h2 className="text-4xl md:text-6xl font-normal text-forest mb-8 leading-tight">
                La beauté du <br />
                <span className="text-sage">numérique.</span>
              </h2>
              <p className="text-lg text-ink-muted mb-10 leading-relaxed font-medium">
                Offrez à vos clients un menu visuel haute définition directement sur leur téléphone. Des images qui donnent faim, des descriptions claires et un processus de commande intuitif.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                 <div className="space-y-2">
                    <h4 className="font-black text-forest uppercase text-xs tracking-widest">Zéro App</h4>
                    <p className="text-xs text-ink-muted font-medium">Fonctionne instantanément dans n'importe quel navigateur mobile.</p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="font-black text-forest uppercase text-xs tracking-widest">Multi-Langue</h4>
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
            <div className="bg-forest rounded-[4rem] p-16 md:p-24 relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-normal text-white mb-8 tracking-tight">Prêt à moderniser votre service ?</h2>
                  <p className="text-white/60 mb-12 max-w-xl mx-auto font-medium">Rejoignez le réseau PayDish et offrez à vos clients la liberté qu'ils attendent.</p>
                  <Link to="/auth?signup=true" className="btn-cafe px-12 py-5 inline-flex items-center gap-3">
                     Démarrer gratuitement <ArrowRight size={18} />
                  </Link>
               </div>
               <div className="absolute top-0 left-0 w-full h-full bg-sage/5 pointer-events-none"></div>
               <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-sage/10 blur-[100px] rounded-full"></div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-forest pt-32 pb-12 text-white/90">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 pb-24 border-b border-white/5">
            <div className="lg:col-span-4 space-y-8">
              <Link to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="PayDish Logo" className="h-10 w-auto" />
                <span className="text-2xl font-normal tracking-tighter text-white uppercase font-diplomata">PayDish</span>
              </Link>
              <p className="text-white/50 leading-relaxed max-w-sm font-medium">
                La solution digitale de référence pour la restauration au Bénin. Simplifier, sécuriser, valoriser.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-sage mb-8">Solution</h5>
                <ul className="space-y-4 text-sm font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">Menu QR</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Gestion Commandes</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Paiement Mobile</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-sage mb-8">Partenariat</h5>
                <ul className="space-y-4 text-sm font-medium text-white/40">
                  <li><a href="#" className="hover:text-white transition-colors">Devenir Partenaire</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Témoignages</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-sage mb-8">Légal</h5>
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
