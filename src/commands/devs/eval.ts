import { ApplicationCommandType } from "discord.js";
import Command from "../../classes/Command"
import Tom5 from "../../classes/Tom5";

export class Comando extends Command {

    client: Tom5

    constructor(
        client: Tom5
    ) {
        super(
            {
                name: "eval",
                description: "Comando de teste",
                type: ApplicationCommandType.ChatInput,
                devOnly: true,
                
            },
        )
        this.client = client
        this.execute = async ({ctx}) => {

            await ctx.interaction.reply(
                {
                    content: "Teste bem sucedido"
                }
            )
        }
    }
}