import { Collection } from "discord.js";
import Tom5 from "../classes/Tom5";
import fs from "fs"
import chalk from "chalk"

export default class EventsManager {

    client: Tom5;
    
    constructor(
        client: Tom5,
    ) {
        this.client = client
    }

    async loadEvents(): Promise<void> {

        console.log(
            chalk.bold.yellow(
                "[EVENTOS]"
            ),
            "A debugar..."
        )

        const pastas = fs.readdirSync("./src/events/")

        pastas.forEach(async (pasta) => {

            const arquivos = fs.readdirSync(`./src/events/${pasta}/`)

            arquivos.forEach(async (arquivo) => {

                const { Evento } = await import(`../events/${pasta}/${arquivo}`)

                const event = new Evento(this.client)

                const nome = arquivo.replace(".ts", "")

                this.client.utils.events.set(nome, event)

                switch(event.once) {
                    case true: {
                        this.client.once(event.name, (...args) => event.execute(...args))

                        break
                    }

                    case false: {
                        this.client.on(event.name, (...args) => event.execute(...args))
                    }
                }
                
            })
        })

        console.log(
            chalk.bold.green(
                "[EVENTOS]"
            ),
            "Debugados"
        )
    }
}