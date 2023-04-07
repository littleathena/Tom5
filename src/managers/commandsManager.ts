import { Collection } from "discord.js";
import Tom5 from "../classes/Tom5";
import fs from "fs"

export default class CommandsManager {

    client: Tom5
    comandos: Collection<string, object>
    aliases: Collection<string, object>

    constructor(client: Tom5) {
        this.client = client
        this.comandos = new Collection()
        this.aliases = new Collection()
    }

    async loadCommands(): Promise<void> {

        const pastas = fs.readdirSync("./src/commands/")

        pastas.forEach(async (pasta) => {

            const files = fs.readdirSync(`./src/commands/${pasta}/`)

            files.forEach(async (arquivo) => {

                const commandClass = (await import(`../commands/${pasta}/${arquivo}`)).default

                const comando = new commandClass(this.client)

                this.comandos.set(comando.name, comando)

                if(comando.aliases?.length > 0) {

                    for(let aliase in comando.aliases) {
                        this.aliases.set(aliase, comando)
                    }
                }
            })
        })
    }
}