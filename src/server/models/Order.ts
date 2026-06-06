import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  restaurantId!: string;

  @Column()
  tableNumber!: string;

  @Column('jsonb', { nullable: true })
  items!: any;

  @Column('decimal', { precision: 10, scale: 2 })
  total!: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'preparing', 'ready', 'served'],
    default: 'pending'
  })
  status!: 'pending' | 'preparing' | 'ready' | 'served';

  @Column({
    type: 'enum',
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  })
  paymentStatus!: 'unpaid' | 'paid';

  @Column({
    type: 'enum',
    enum: ['MoMo', 'Moov', 'Wave', 'Card', 'Cash'],
    nullable: true
  })
  paymentMethod?: 'MoMo' | 'Moov' | 'Wave' | 'Card' | 'Cash';

  @Column({ type: 'text', nullable: true })
  specialInstructions?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
