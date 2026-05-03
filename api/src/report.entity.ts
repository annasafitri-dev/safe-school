import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column({ nullable: true })
  pelaku: string;

  @Column()
  laporan: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  bukti: string;
}
