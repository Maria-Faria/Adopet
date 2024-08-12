import { Repository } from "typeorm";
import AdopterEntity from "../entities/AdopterEntity";
import InterfaceAdopterRepository from "./interface/InterfaceAdopterRepository";

export default class AdopterRepository {
    constructor(private repository: Repository<AdopterEntity>) {}

    createAdopter(adopter: AdopterEntity): void | Promise<void> {
        this.repository.save(adopter);
    }

    async listAdopters(): Promise<AdopterEntity[]>{
        return await this.repository.find();
    }

    async updateAdopter(id: number, newData: AdopterEntity): Promise<{success: boolean, message?: string}> {
        try {
            const adopterToUpdate = await this.repository.findOne({ where: { id }});

            if(!adopterToUpdate) {
                return { success: false, message: "Adotante não encontrado"};
            }

            Object.assign(adopterToUpdate, newData);

            await this.repository.save(adopterToUpdate);

            return { success: true };

        } catch (error) {
            console.log(error);
            return { success: false, message: "Ocorreu um erro ao atualizar o Adotante" };
        }
    }

    async deleteAdopter(id: number): Promise<{success: boolean, message?: string}> {
        try {
            const adopterToDelete = await this.repository.findOne({ where: { id }});

            if(!adopterToDelete) {
                return { success: false, message: "Adotante não encontrado" };
            }

            await this.repository.remove(adopterToDelete);
            return {success: true};
            
        } catch (error) {
            console.log(error);
            return {success: false, message: "Ocorreu um erro ao deletar o Adotante"};
        }
    }
}