import { Repository } from "typeorm";
import AdopterEntity from "../entities/AdopterEntity";
import InterfaceAdopterRepository from "./interface/InterfaceAdopterRepository";

export default class AdopterRepository {
    constructor(private repository: Repository<AdopterEntity>) {}

    createAdopter(adopter: AdopterEntity): void | Promise<void> {
        this.repository.save(adopter);
    }
}