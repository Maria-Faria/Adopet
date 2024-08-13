import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AdopterEntity from "./AdopterEntity";

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

    constructor(nome: string, especie: EnumEspecie, dateOfBirth: Date, adotado: boolean) {
        this.nome = nome;
        this.especie = especie;
        this.dateOfBirth = dateOfBirth;
        this.adotado = adotado;
    }
}