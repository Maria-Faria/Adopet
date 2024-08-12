import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import AddressEntity from "./AddressEntity";

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

    @OneToOne(() => AddressEntity, { nullable: true, cascade: true, eager: true }) //cascade -> oq acontece com o adotante, acontece com o endereço
    @JoinColumn()
    address?: AddressEntity;

    constructor(name: string, password: string, phone: string, photo?: string, address?: AddressEntity) {
        this.name = name;
        this.password = password;
        this.photo = photo;
        this.phone = phone;
        this.address = address;
    }
}