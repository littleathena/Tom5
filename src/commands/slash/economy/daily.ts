import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import Command from "../../../classes/Command";
import Tom5 from "../../../classes/Tom5";
import userModel from "../../../database/models/userModel";

export class Comando extends Command {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "daily",
                description: "[🪙] Colete a sua recompensa diária",
                type: ApplicationCommandType.ChatInput,
                usage: "/daily",
                botPermissions: [
                    "SendMessages"
                ]
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            const userDoc = await this.client.db.getOne(
                "users",
                {
                    _id: ctx.interaction.user.id
                }
            )

            let nextClaim = userDoc.economia.daily.nextClaim
            let now = Date.now()

            if(now < nextClaim) {
                return ctx.interaction.reply(
                    {
                        embeds: [
                            new EmbedBuilder()
                            .setColor("#2a2d31")
                            .setDescription(`**(${this.client._emojis.errado}) Já resgatou o seu daily hoje. Volte <t:${~~(nextClaim / 1000)}:R>.**`)
                        ]
                    }
                )
            }

            let reward = Math.floor((Math.random() * 1000) + 400)

            await this.client.db.updateOne(
                "users",
                {
                    _id: ctx.interaction.user.id
                },
                {
                    $set: {
                        "economia.wallet": userDoc.economia.wallet + reward,
                        "economia.daily.lastClaim": Date.now(),
                        "economia.daily.nextClaim": Date.now() + 86400000
                    },
                    $push: {
                        "economia.transactions": {
                            type: "+",
                            name: "Daily",
                            amount: reward
                        }
                    }
                }
            )

            ctx.interaction.reply(
                {
                    embeds: [
                        new EmbedBuilder()
                        .setColor("#2a2d31")
                        .setDescription(`**(${this.client._emojis.certo}) Recebeste \`${reward}\` <:tom5_icons_dollar:1013544459503423618> TomCoins! Volta <t:${~~((Date.now() + 86400000) / 1000)}:R>.**`)
                    ]
                }
            )
        }
    }
}