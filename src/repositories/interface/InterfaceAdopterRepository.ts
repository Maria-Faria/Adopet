import AddressEntity from "../../entities/AddressEntity";
import AdopterEntity from "../../entities/AdopterEntity";

export default interface InterfaceAdopterRepository {
    createAdopter(adopter: AdopterEntity): void | Promise<void>;
    
    
    updateAdopter(id: number, adopter: AdopterEntity): AdopterEntity | Promise<{success: boolean, message: string}>;

    deleteAdopter(id: number): Promise<{success: boolean, message: string}>;
    
    updateAdopterAddress(id: number, address: AddressEntity): Promise<{ success: boolean, message: string}> | void
}