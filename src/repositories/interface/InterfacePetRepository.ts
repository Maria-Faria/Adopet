import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
    createPet(pet: PetEntity): void;
    listPets(): PetEntity[] | Promise<PetEntity[]>;
    updatePet(id: number, pet: PetEntity): Promise<{success: boolean; message?: string}>
    deletePet(id: number): Promise<{success: boolean; message?: string}>;
    adoptPet(id_pet: number, id_adopter: number): Promise<{success: boolean; message?: string}>;
}