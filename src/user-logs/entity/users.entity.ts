import { Accounts } from 'src/accounts/entities/accounts.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity({ name:'users_logs' })
export class UserLog {
  @PrimaryGeneratedColumn()
  user_logs_id: number;

  @Column()
  accountId: number;

  @Column()
  username: string;

  @Column()
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Accounts, (account) => account.logs, {
    nullable: false,
    eager: true,
  })
  account: Accounts;
}
