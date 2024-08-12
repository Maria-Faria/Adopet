import AdopterEntity from "../../entities/AdopterEntity";

export default interface InterfaceAdopterRepository {
    createAdopter(adoppter: AdopterEntity): void | Promise<void>;
}