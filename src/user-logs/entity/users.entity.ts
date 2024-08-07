import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name:'users_logs' })
export class UserLog {
  @PrimaryGeneratedColumn()
  user_logs_id: number;

  @Column()
  userId: number;

  @Column()
  username: string;

  @Column()
  status: number;

  @CreateDateColumn()
  createdAt: Date;
}
