import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class AdopterEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    photo?: string; //opcional - ? = manipulações no TypeScript

    @Column()
    phone: string;

    @Column({ nullable: true})
    address?: string;

    constructor(name: string, password: string, phone: string, photo?: string, address?: string) {
        this.name = name;
        this.password = password;
        this.photo = photo;
        this.phone = phone;
        this.address = address;
    }
}