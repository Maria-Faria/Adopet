import AdopterEntity from "../../entities/AdopterEntity";

export default interface InterfaceAdopterRepository {
    createAdopter(adopter: AdopterEntity): void | Promise<void>;
    listAdopters(): AdopterEntity[] | Promise<AdopterEntity[]>;
    updateAdopter(id: number, adopter: AdopterEntity): AdopterEntity | Promise<{success: boolean, message: string}>;
    deleteAdopter(id: number): Promise<{success: boolean, message: string}>;
}