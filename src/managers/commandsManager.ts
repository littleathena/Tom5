import { Collection } from "discord.js";
import Tom5 from "../classes/Tom5";
import fs from "fs"
import chalk from "chalk";

export default class CommandsManager {

    client: Tom5

    constructor(client: Tom5) {
        this.client = client
    }

    async loadCommands(): Promise<void> {

        console.log(
            chalk.bold.yellow(
                "[COMANDOS]"
            ),
            "A debugar..."
        )

        this.client.application?.commands.cache.forEach(async (cmd) => { 
            await cmd.delete()
        })

        const pastas = fs.readdirSync("./src/commands/")

        pastas.forEach(async (pasta) => {

            const files = fs.readdirSync(`./src/commands/${pasta}/`)

            files.forEach(async (arquivo) => {

                const { Comando } = await import(`../commands/${pasta}/${arquivo}`)

                const comando = new Comando(this.client)

                this.client.application?.commands.create(comando)

                this.client.utils.commands.set(comando.name, comando)
            })
        })

        console.log(
            chalk.bold.green(
                "[COMANDOS]"
            ),
            "Debugados"
        )
    }
}