import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'images' })
export class Images {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    acc_id: number;

    @Column()
    img: string;

    @Column()
    status: number;

    @CreateDateColumn()
    createdAt: Date;
}
