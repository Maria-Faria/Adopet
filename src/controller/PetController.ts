import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";

let petsList: TipoPet[] = [];

let id: number = 0;

function generateId() {
    id += 1;
    return id;
}

export default class PetController {
    createPet(req: Request, res: Response) {
        const { adotado, especie, dateOfBirth, nome } = <TipoPet>req.body;

        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({error: "Espécie inválida!"});
        }

        const newPet: TipoPet = {id: generateId(), adotado, especie, dateOfBirth, nome};

        petsList.push(newPet);
        res.status(201).json(newPet);
    }

    listPets(req: Request, res: Response) {
        return res.status(200).json(petsList);
    }

    updatePet(req: Request, res: Response) {
        const { id } = req.params;
        const { adotado, especie, dateOfBirth, nome } = <TipoPet>req.body;
        const pet = petsList.find((pet) => pet.id === Number(id));

        if(!pet) {
            return res.status(404).json({error: "Pet não encontrado"});
        }

        pet.nome = nome;
        pet.dateOfBirth = dateOfBirth;
        pet.especie = especie;
        pet.adotado = adotado

        return res.status(200).json(pet);
    }

    deletePet(req: Request, res: Response) {
        const { id } = req.params;
        const pet = petsList.find((pet) => pet.id === Number(id));

        if(!pet) {
            return res.status(404).json({error: "Pet não encontrado"});
        }

        const index = petsList.indexOf(pet);
        petsList.splice(index, 1);

        return res.status(200).json({message: "Pet deletado com sucesso!"});
    }
}