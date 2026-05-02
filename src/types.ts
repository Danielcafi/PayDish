/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Plate {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  new?: boolean;
  allergens?: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  address: string;
  city: string;
  phone: string;
  type: 'Restaurant' | 'Maquis' | 'Fast-food' | 'Brasserie' | 'Café';
  categories: Category[];
  menu: Plate[];
  openingHours: string;
}

export interface OrderItem extends Plate {
  quantity: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  tableNumber: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  paymentStatus: 'unpaid' | 'paid';
  paymentMethod?: 'MoMo' | 'Moov' | 'Wave' | 'Card' | 'Cash';
  createdAt: string;
  specialInstructions?: string;
}

export interface DashboardStats {
  ordersToday: number;
  revenueToday: number;
  averageTicket: number;
  activeTables: number;
  totalTables: number;
}
