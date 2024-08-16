import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interface/InterfacePetRepository";
import AdopterEntity from "../entities/AdopterEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetRepository implements InterfacePetRepository{
    private repository: Repository<PetEntity>;
    private adopterRepository: Repository<AdopterEntity>;

    constructor(repository: Repository<PetEntity>, adopterRepository: Repository<AdopterEntity>) {
        this.repository = repository;
        this.adopterRepository = adopterRepository;
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

    async adoptPet(id_pet: number, id_adopter: number): Promise<{ success: boolean; message?: string }> {
        const pet = await this.repository.findOne({ where: {id: id_pet}});

        if(!pet) {
            return { success: false, message: "Pet não encontrado"};
        }

        const adopter = await this.adopterRepository.findOne({where: {id: id_adopter}});

        if(!adopter) {
            return { success: false, message: "Adotante não encontrado" };
        }

        pet.adopter = adopter;
        pet.adotado = true;
        
        await this.repository.save(pet);

        return { success: true };
    }

    async searchPetForSize(porte: EnumPorte): Promise<PetEntity[]> {
        const pets = await this.repository.find({ where: { porte } });

        return pets;

    }

    async searchPetForGenericField<Type extends keyof PetEntity>(field: Type, value: PetEntity[Type]): Promise<PetEntity[]> {
        const pets = await this.repository.find({where: {[field]: value}});
        
        return pets;
    }
}