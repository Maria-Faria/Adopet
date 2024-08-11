import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    entities: [], //mapear cada nova entidade como uma tabela no banco
    synchronize: true
})