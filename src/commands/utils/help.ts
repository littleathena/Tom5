import { ApplicationCommandType } from "discord.js";
import Command from "../../classes/Command";
import Tom5 from "../../classes/Tom5";

export class Comando extends Command {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "help",
                description: "[📒] Comando de ajuda",
                type: ApplicationCommandType.ChatInput,
                devOnly: false,
                userPermissions: ["SendMessages"],
                botPermissions: ["SendMessages", "ManageMessages", "EmbedLinks"]
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            const comandos = this.client.utils.commands.map((c: any) => c)

            const categorias = ["[🧪]", "[🎵]", "[📒]"]

            var devCommands, musicCommands, utilCommands;

            for(let categoria of categorias) {

                switch(categoria) {
                    case "[🧪]": {

                        devCommands = comandos.filter(c => c.description.startsWith("[🧪]"))
                        devCommands = devCommands.map(c => c.description.replace("[🧪]", ""))

                    }
                }
            }
        }
    }
}