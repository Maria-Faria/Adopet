import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interface/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository{
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }
    
    createPet(pet: PetEntity): void {
        this.repository.save(pet);
    }
    async listPets(): Promise<PetEntity[]> {
        return await this.repository.find();
    }
    async updatePet(id: number, newData: PetEntity): Promise<{success: boolean; message?: string}> {

        try{
            const petToUpdate = await this.repository.findOne({ where: { id }});

            if(!petToUpdate) {
                return { success: false, message: "Pet não encontrado" };
            }

            Object.assign(petToUpdate, newData);

            await this.repository.save(petToUpdate);

            return { success: true };
        
        }catch(error){
            console.log(error)
            return { success: false, message: "Erro ao atulizar as informações do Pet" };
        };
    }
    async deletePet(id: number): Promise<{success: boolean; message?: string}> {
        try {
            const petToDelete = await this.repository.findOne({ where: { id }});

            if(!petToDelete) {
                return { success: false, message: "Pet não encontrado" };
            }

            await this.repository.remove(petToDelete);

            return { success: true };

        } catch (error) {
            console.log(error);
            return { success: false, message: "Ocorreu um erro ao deletar o Pet" };
        }

    }
}