import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { MenuItem } from '../models/MenuItem';
import { Order } from '../models/Order';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true, // set false in prod and use migrations
  logging: false,
  entities: [User, MenuItem, Order],
});
