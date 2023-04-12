import chalk from "chalk";
import Tom5 from "../classes/Tom5";
import mongoose from "mongoose"

export default class DatabaseManager {

    client: Tom5

    constructor(client: Tom5) {
        this.client = client
    }

    async config() {

        mongoose.Promise = global.Promise

        mongoose.set("strictQuery", true)

        try {

            await mongoose.connect(
                process.env.DB_TOKEN as string,
                {
                    dbName: "Tom5"
                }
            )
    
            import("../database/allModels")

            console.log(
                chalk.bold.green(
                    "[DATABASE]"
                ),
                "Conectada"
            )
        } catch(err) {

            console.log(
                chalk.bold.red(
                    "[DATABASE]"
                ),
                `Erro ao conectar. Erro: \n\n${err}`
            )
        }
    }
}