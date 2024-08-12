import { Request, Response } from "express";
import AdopterRepository from "../repositories/AdopterRepository";
import AdopterEntity from "../entities/AdopterEntity";

export default class AdopterController {
    constructor(private repository: AdopterRepository) {}

    async createAdopter(req: Request, res: Response) {
        const { name, phone, address, photo, password } = <AdopterEntity>req.body;

        const newAdopter = new AdopterEntity(name, password, phone, photo, address);

        await this.repository.createAdopter(newAdopter);

        return res.status(201).json(newAdopter);
    }
}