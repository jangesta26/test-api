import { UploadImage } from "src/upload/entities/upload.entity";
import { UserLog } from "src/user-logs/entity/users.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => UploadImage, (uploadImage) => uploadImage.account)
    images: UploadImage;

    @OneToMany(() => UserLog, (usersLogs) => usersLogs.account)
    logs: UserLog;

}
