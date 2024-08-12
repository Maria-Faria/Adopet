import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";

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

    constructor(nome: string, especie: EnumEspecie, dateOfBirth: Date, adotado: boolean) {
        this.nome = nome;
        this.especie = especie;
        this.dateOfBirth = dateOfBirth;
        this.adotado = adotado;
    }
}