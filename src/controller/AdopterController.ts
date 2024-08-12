import { Request, Response } from "express";
import AdopterRepository from "../repositories/AdopterRepository";
import AdopterEntity from "../entities/AdopterEntity";
import AddressEntity from "../entities/AddressEntity";

export default class AdopterController {
    constructor(private repository: AdopterRepository) {}
    async createAdopter(req: Request, res: Response) {
        const { name, phone, address, photo, password } = <AdopterEntity>req.body;

        const newAdopter = new AdopterEntity(name, password, phone, photo, address);

        await this.repository.createAdopter(newAdopter);

        return res.status(201).json(newAdopter);
    }

    async listAdopters(req: Request, res: Response) {
        const adoptersList = await this.repository.listAdopters();

        return res.status(200).json(adoptersList);
    }

    async updateAdopter(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.updateAdopter(Number(id), <AdopterEntity>req.body);

        if(!success) {
            return res.status(404).json({error: "Adotante não encontrado"});
        }

        return res.sendStatus(204);
    }

    async deleteAdopter(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.deleteAdopter(Number(id));

        if(!success) {
            return res.status(404).json({error: message});
        }

        return res.sendStatus(204);
    }

    async updateAdopterAddress(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.updateAdopterAddress(Number(id), <AddressEntity>req.body);

        if(!success) {
            return res.status(404).json({error: message});
        }

        return res.sendStatus(204);
    }
}