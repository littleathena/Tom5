import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } from "discord.js";
import Command from "../../../classes/Command";
import Tom5 from "../../../classes/Tom5";

export class Comando extends Command {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "parceria",
                description: "[🤝] Faça uma parceria",
                usage: "t.parceria",
                dmPerm: true
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            if(ctx.message?.guild) {
                ctx.message?.reply(
                    {
                        embeds: [
                            new EmbedBuilder()
                            .setColor("#2a2d31")
                            .setDescription(`(${this.client._emojis.load}) Clique no botão abaixo para realizar uma parceria.`)
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
            } else if(ctx.message?.channel.isDMBased()) {

                ctx.message.reply(
                    {
                        embeds: [
                            new EmbedBuilder()
                            .setColor("#2a2d31")
                            .setDescription(`**Olá ${ctx.message.author}, gostaria de realizar uma parceria com o Tom5?**\n\n**Veja abaixo para como prosseguir com seu pedido**\n> - Clique no botão abaixo para iniciar o seu pedido de parceria.\n\n**Nota**\n>>> O pedido de parceria será enviado para o meu servidor de suporte e será analisado por uma pessoa autozizada em nossa equipe para tal procedimento.\n\nVocê será notificado por meio desse canal e no canal específicado em nosso servidor de suporte no caso de aceitação ou reprovação.`)
                        ],
                        components: [
                            new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId("criar_parceria_bot")
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
}
