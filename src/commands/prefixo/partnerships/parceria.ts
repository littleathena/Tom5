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
            } else if(ctx.message?.channel.isDMBased()) {

                ctx.message.reply(
                    {
                        embeds: [
                            new EmbedBuilder()
                            .setColor("#2a2d31")
                            .setDescription(`**Olá ${ctx.message.author}! Reparei que gostarias de fazer uma parceria comigo!**\n\n**Segue os passos abaixo para prosseguires**\n> - Clica no botão abaixo para iniciar o pedido de parceria.\n\n**Nota**\n>>> O pedido de parceria será enviado para o meu servidor de suporte e será analisado pela equipa do bot responsável pelo processamento destes pedidos.\n\nSerás notificado via Mensagem Privada e no canal específico no servidor de suporte se fores aceite ou reprovado.`)
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