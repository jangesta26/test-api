import { Accounts } from "src/accounts/entities/accounts.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'image' })
export class UploadImage {
    @PrimaryGeneratedColumn()
    uploadId: number;

    @Column()
    accountId: number;

    @Column({ type: 'varchar', length: 255 })
    imageUrl: string;

    @Column()
    status: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Accounts, (account) => account.images, {
        nullable: false,
        eager: true,
    })
    account: Accounts;

}
