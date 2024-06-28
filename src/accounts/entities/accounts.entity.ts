import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'accounts' })
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column()
    gender: string;

    @Column()
    dob: Date;

    @Column({ unique: true })
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;
    
    @Column()
    status: number;

    @CreateDateColumn()
    createdAt: Date;
}
