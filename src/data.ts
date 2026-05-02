/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Restaurant, Order } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    slug: 'le-bon-gout',
    name: 'Le Bon Goût',
    description: 'Le meilleur de la cuisine béninoise traditionnelle à Cotonou.',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=200',
    address: 'Avenue Steinmetz, Cotonou',
    city: 'Cotonou',
    phone: '+229 97 00 00 01',
    type: 'Restaurant',
    openingHours: '11h00 - 23h00',
    categories: [
      { id: 'cat-1', name: 'Entrées' },
      { id: 'cat-2', name: 'Plats de Résistance' },
      { id: 'cat-3', name: 'Boissons' },
      { id: 'cat-4', name: 'Desserts' }
    ],
    menu: [
      {
        id: 'p1',
        name: 'Igname Pilée (Foutou)',
        description: 'Igname pilée servie avec une sauce graine onctueuse et du poisson.',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=400',
        category: 'Plats de Résistance',
        popular: true
      },
      {
        id: 'p2',
        name: 'Atassi (Riz au haricot)',
        description: 'Mélange de riz et haricots servi avec du poisson frit et du piment noir (Dja).',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400',
        category: 'Plats de Résistance'
      },
      {
        id: 'p3',
        name: 'Amiwo au Poulet',
        description: 'Pâte de maïs rouge (Amiwo) servie avec du poulet bicyclette braisé.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400',
        category: 'Plats de Résistance',
        popular: true
      },
      {
        id: 'p4',
        name: 'Jus de Bissap',
        description: 'Boisson rafraîchissante à base de fleurs d\'hibiscus.',
        price: 500,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400',
        category: 'Boissons'
      }
    ]
  },
  {
    id: 'rest-2',
    slug: 'maquis-du-port',
    name: 'Maquis du Port',
    description: 'Ambiance chaleureuse et grillades au bord de la lagune.',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=200',
    address: 'Zone Portuaire, Cotonou',
    city: 'Cotonou',
    phone: '+229 96 00 00 02',
    type: 'Maquis',
    openingHours: '12h00 - 02h00',
    categories: [
      { id: 'cat-1', name: 'Grillades' },
      { id: 'cat-2', name: 'Accompagnements' },
      { id: 'cat-3', name: 'Boissons' }
    ],
    menu: [
      {
        id: 'p5',
        name: 'Poisson Braisé',
        description: 'Carpe ou Capitaine braisé au charbon de bois.',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=400',
        category: 'Grillades',
        popular: true
      },
      {
        id: 'p6',
        name: 'Tchoukoutou',
        description: 'Bière locale traditionnelle à base de sorgho.',
        price: 800,
        image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=400',
        category: 'Boissons'
      }
    ]
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1',
    restaurantId: 'rest-1',
    tableNumber: '7',
    items: [
      { ...RESTAURANTS[0].menu[0], quantity: 2 },
      { ...RESTAURANTS[0].menu[3], quantity: 2 }
    ],
    total: 8000,
    status: 'preparing',
    paymentStatus: 'paid',
    paymentMethod: 'MoMo',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ord-2',
    restaurantId: 'rest-1',
    tableNumber: '3',
    items: [
      { ...RESTAURANTS[0].menu[1], quantity: 1 }
    ],
    total: 1500,
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: new Date().toISOString()
  }
];
