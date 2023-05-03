import { ApplicationCommandType, ButtonStyle } from "discord.js";
import Command from "../../../classes/Command";
import Tom5 from "../../../classes/Tom5";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";

export class Comando extends Command {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "parceria",
                description: "[🤝] Faça uma parceria",
                type: ApplicationCommandType.ChatInput,
                usage: "/parceria",
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            ctx.interaction?.reply(
                {
                    embeds: [
                        new EmbedBuilder()
                        .setColor("#2a2d31")
                        .setDescription(`(${this.client._emojis.load}) Clique no botão abaixo para fazer uma parceria.`)
                    ],
                    components: [
                        new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            new ButtonBuilder()
                            .setCustomId("criar_parceria")
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(
                                {
                                    animated: false,
                                    id: "1013546823857746001",
                                    name: "tom5_icons_partner"
                                }
                            )
                        )
                    ]
                }
            )
        }
    }
}