/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { QrCode, Utensils, CreditCard, ChevronRight, CheckCircle, Star, Users, ArrowRight, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-green p-1.5 rounded-lg">
              <QrCode className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand-dark">PayDish</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-brand-green transition-colors">Fonctionnalités</a>
            <a href="#how-it-works" className="hover:text-brand-green transition-colors">Comment ça marche</a>
            <a href="#pricing" className="hover:text-brand-green transition-colors">Tarifs</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth" className="text-sm font-medium text-gray-600 hover:text-brand-dark transition-colors">Connexion</Link>
            <Link to="/auth?signup=true" className="bg-brand-green text-white px-5 py-2 rounded-btn text-sm font-semibold hover:opacity-90 transition-opacity">Commencer gratuitement</Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-brand-green" />
              +200 restaurants partenaires au Bénin
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-brand-dark leading-[1.1] mb-6">
              Transformez l'expérience de vos <span className="text-brand-green">clients</span> en restaurant
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
              Scannez le QR code sur votre table, consultez le menu, commandez et payez — sans attendre le serveur. Simple, rapide et moderne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth?signup=true" className="bg-brand-green text-white px-8 py-4 rounded-btn text-lg font-bold shadow-lg shadow-brand-green/20 hover:scale-[1.02] transition-transform text-center">
                Commencer gratuitement
              </Link>
              <Link to="/scan" className="bg-brand-dark/5 text-brand-dark px-8 py-4 rounded-btn text-lg font-bold hover:bg-brand-dark/10 transition-colors text-center">
                Voir une démo
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-brand-dark mx-auto w-[280px] h-[580px] bg-white">
              {/* Mockup UI Content */}
              <div className="bg-brand-green h-24 p-4 flex items-end">
                <div className="bg-white/20 w-12 h-2 rounded mb-2"></div>
              </div>
              <div className="p-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="text-brand-green w-10 h-10" />
                </div>
                <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto mb-8"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-full"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-brand-green rounded-full"></div>
            </div>
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-green/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-1/4 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark mb-4">L'expérience client réinventée</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trois étapes simples pour une satisfaction maximale et un service ultra-fluide.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: QrCode, title: "Scannez", desc: "Pointez votre caméra vers le QR code sur votre table pour accéder au menu.", color: "bg-blue-500" },
              { icon: Utensils, title: "Commandez", desc: "Parcourez le menu riche, personnalisez vos plats et ajoutez-les au panier.", color: "bg-brand-orange" },
              { icon: CreditCard, title: "Payez", desc: "Réglez par Mobile Money (MTN, Moov, Wave) ou carte bancaire en un clic.", color: "bg-brand-green" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-soft"
              >
                <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-${feature.color}/20`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Restaurants */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-brand-dark rounded-[40px] p-8 lg:p-20 text-white overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8">Plus qu'un menu digital, un moteur de croissance.</h2>
              <div className="space-y-6">
                {[
                  "Réduction du temps d'attente de 60%",
                  "Augmentation du ticket moyen de 25%",
                  "Zéro erreur de commande",
                  "Tableau de bord en temps réel",
                  "Intégration Mobile Money Bénin (MTN, Moov, Wave)"
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="bg-brand-green p-1 rounded-full">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md">
                  <div className="text-4xl font-bold text-brand-green mb-1">+25%</div>
                  <div className="text-sm text-gray-400">Revenus mensuels</div>
                </div>
                <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md">
                  <div className="text-4xl font-bold text-brand-orange mb-1">100%</div>
                  <div className="text-sm text-gray-400">Précision commandes</div>
                </div>
              </div>
              <div className="pt-12 space-y-4">
                <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md">
                  <div className="text-4xl font-bold text-blue-400 mb-1">-15min</div>
                  <div className="text-sm text-gray-400">Temps de service</div>
                </div>
                <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md">
                  <div className="text-4xl font-bold text-purple-400 mb-1">0</div>
                  <div className="text-sm text-gray-400">Contact physique</div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/20 rounded-full blur-[100px] -z-0"></div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark mb-16">Des plans adaptés à votre taille</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Gratuit", price: "0", features: ["1 table unique", "20 commandes / mois", "Menu digital basique", "Support email"], cta: "Commencer" },
              { name: "Pro", price: "15 000", features: ["Jusqu'à 20 tables", "Commandes illimitées", "Analytics avancés", "Support prioritaire"], popular: true, cta: "Choisir Pro" },
              { name: "Restaurant+", price: "35 000", features: ["Tables illimitées", "Multi-succursale", "Intégration API", "Gestionnaire dédié"], cta: "Contacter l'équipe" }
            ].map((plan, i) => (
              <div key={i} className={`relative p-10 rounded-3xl border-2 ${plan.popular ? 'border-brand-green bg-white shadow-2xl scale-105 z-10' : 'border-gray-100 bg-gray-50'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Le plus populaire
                  </div>
                )}
                <h3 className="text-2xl font-bold text-brand-dark mb-4">{plan.name}</h3>
                <div className="mb-8">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-gray-500 font-medium ml-1">FCFA/mois</span>
                </div>
                <ul className="space-y-4 mb-10 text-left">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex gap-3 items-center text-gray-600">
                      <CheckCircle className={`w-5 h-5 ${plan.popular ? 'text-brand-green' : 'text-gray-300'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-brand-green text-white hover:opacity-90' : 'bg-brand-dark text-white hover:bg-gray-800'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Ils nous font confiance au Bénin</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Mme. Adjoua", restaurant: "Le Saveur de Cotonou", text: "PayDish a radicalement changé ma façon de gérer les commandes. Mes clients adorent ne plus avoir à attendre pour demander l'addition.", city: "Cotonou" },
              { name: "Mr. Koffi", restaurant: "Le Maquis de Porto", text: "L'intégration Mobile Money est un vrai plus. Les paiements sont sécurisés et arrivent directement sur mon compte. Plus d'erreurs de caisse !", city: "Porto-Novo" },
              { name: "Mlle. Sika", restaurant: "Buvette Parakou", text: "Simple à mettre en place même pour un petit établissement comme le mien. Les QR codes sont élégants et attirent l'attention.", city: "Parakou" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <div className="flex gap-1 mb-4 text-brand-orange">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 italic mb-6">"{t.text}"</p>
                <div className="mt-auto">
                  <div className="font-bold text-brand-dark">{t.name}</div>
                  <div className="text-sm text-brand-green">{t.restaurant} — {t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 border-b border-white/10 pb-16">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-brand-green p-1.5 rounded-lg text-white">
                <QrCode className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">PayDish</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              La solution digitale complète pour les restaurateurs béninois. Scannez, commandez, payez.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors"><Users /></a>
              {/* Add other socials */}
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-24">
            <div>
              <h4 className="font-bold mb-6">Produit</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Démo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PWA</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Entreprise</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partenaires</a></li>
              </ul>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <h4 className="font-bold mb-6">Légal</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
          <p>© 2025 PayDish — Cotonou, Bénin. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Français (Bénin)</a>
            <a href="#" className="hover:text-white transition-colors">English (Coming soon)</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
