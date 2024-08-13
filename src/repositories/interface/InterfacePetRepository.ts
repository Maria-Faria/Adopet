import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
    createPet(pet: PetEntity): void;

    listPets(): PetEntity[] | Promise<PetEntity[]>;

    updatePet(id: number, pet: PetEntity): Promise<{success: boolean; message?: string}>;

    deletePet(id: number): Promise<{success: boolean; message?: string}>;

    adoptPet(id_pet: number, id_adopter: number): Promise<{success: boolean; message?: string}>;

    searchPetForSize(porte: EnumPorte): PetEntity[] | Promise<PetEntity[]>;
}