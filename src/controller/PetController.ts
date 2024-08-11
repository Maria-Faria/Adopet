import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";

let petsList: TipoPet[] = [];

export default class PetController {
    createPet(req: Request, res: Response) {
        const {id, adotado, especie, idade, nome} = <TipoPet>req.body;

        const newPet: TipoPet = {id, adotado, especie, idade, nome};

        petsList.push(newPet);
        res.status(201).json(newPet);
    }
}