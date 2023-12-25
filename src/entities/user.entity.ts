import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;


  @Column()
  creator_id: number;

  @Column()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}