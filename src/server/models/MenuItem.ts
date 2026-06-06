import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ nullable: true })
  image?: string;

  @Column()
  category!: string;

  @Column({ default: false })
  popular!: boolean;

  @Column('simple-array', { nullable: true })
  allergens?: string[];
}
