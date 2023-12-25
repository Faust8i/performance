import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity('articles')
export class Article {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  tags: string;

  @Column()
  is_public: boolean;


  @Column()
  creator_id: number;

  @Column()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

}