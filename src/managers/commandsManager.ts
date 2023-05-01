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

        // SLASH COMMANDS

        await this.client.utils.commands.slash.forEach(async (c: any) => {
            
            let cmd = await this.client.application?.commands.cache.find(c.name)

            if(!cmd) this.client.utils.commands.slash.delete(c.name)
        })

        const pastas = fs.readdirSync("./src/commands/slash")

        pastas.forEach(async (pasta) => {

            const files = fs.readdirSync(`./src/commands/slash/${pasta}/`)

            files.forEach(async (arquivo) => {

                const { Comando } = await import(`../commands/slash/${pasta}/${arquivo}`)

                const comando = new Comando(this.client)

                if(!this.client.application?.commands.cache.find(c => c.name === comando.name)) {
                    await this.client.application?.commands.create(comando)
                }

                this.client.utils.commands.slash.set(comando.name, comando)
            })
        })

        // PREFIX COMMANDS

        const pastasPrefix = fs.readdirSync("./src/commands/prefixo")

        pastasPrefix.forEach(async (pasta) => {

            const files = fs.readdirSync(`./src/commands/prefixo/${pasta}/`)

            files.forEach(async (arquivo) => {

                const { Comando } = await import(`../commands/prefixo/${pasta}/${arquivo}`)

                const comando = new Comando(this.client)

                this.client.utils.commands.prefix.set(comando.name, comando)

                if(comando.aliases) {
                    for(let alias of comando.aliases) {
                        this.client.utils.aliases.set(alias, comando)
                    }
                }
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