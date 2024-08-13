import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";

let petsList: TipoPet[] = [];

let id: number = 0;

function generateId() {
    
    id += 1;
    return id;
}

export default class PetController {
    constructor(private repository: PetRepository) {}
    async createPet(req: Request, res: Response) {
        const { adotado, especie, dateOfBirth, nome, porte } = <PetEntity>req.body;

        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({error: "Espécie inválida!"});
        }

        if(porte && (!(porte in EnumPorte))) {
            return res.status(400).json({error: "Porte inválido!"});
        }

        const newPet = new PetEntity(nome, especie, dateOfBirth, adotado, porte);

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

    async adoptPet(req: Request, res: Response) {
        const { pet_id, adopter_id } = req.params;

        const { success, message } = await this.repository.adoptPet(Number(pet_id), Number(adopter_id));

        if(!success) {
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    async searchPetForSize(req: Request, res: Response) {
        const { porte } = req.query;

        const petsList = await this.repository.searchPetForSize(<EnumPorte>porte);

        return res.status(200).json(petsList);
    }
}