import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let petsList: TipoPet[] = [];

let id: number = 0;

function generateId() {
    id += 1;
    return id;
}

export default class PetController {
    constructor(private repository: PetRepository) {}
    async createPet(req: Request, res: Response) {
        const { adotado, especie, dateOfBirth, nome } = <PetEntity>req.body;

        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({error: "Espécie inválida!"});
        }

        const newPet = new PetEntity(nome, especie, dateOfBirth, adotado);

        await this.repository.createPet(newPet);
        res.status(201).json(newPet);
    }

    async listPets(req: Request, res: Response) {
        const petsList = await this.repository.listPets();
        return res.status(200).json(petsList);
    }

    async updatePet(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.updatePet(
            Number(id),
            <PetEntity>req.body
        );

        if(!success) {
            return res.status(404).json({error: "Pet não encontrado"});
        }

        return res.sendStatus(204);
    }

    async deletePet(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.deletePet(Number(id));

        if(!success) {
            return res.status(404).json({error: "Pet não encontrado"});
        }

        return res.sendStatus(201);
    }
}