import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AdopterEntity from "./AdopterEntity";
import EnumPorte from "../enum/EnumPorte";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number; //! -> esse campo não será inicializado agora

    @Column()
    nome: string;

    @Column()
    especie: EnumEspecie;

    @Column()
    dateOfBirth: Date;

    @Column()
    adotado: boolean;

    @ManyToOne(() => AdopterEntity, (adopter) => adopter.pets)
    adopter!: AdopterEntity

    @Column({ nullable: true })
    porte?: EnumPorte;

    constructor(nome: string, especie: EnumEspecie, dateOfBirth: Date, adotado: boolean, porte?: EnumPorte) {
        this.nome = nome;
        this.especie = especie;
        this.dateOfBirth = dateOfBirth;
        this.adotado = adotado;
        this.porte = porte;
    }
}