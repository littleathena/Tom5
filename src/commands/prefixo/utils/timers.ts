import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import Command from "../../../classes/Command";
import Tom5 from "../../../classes/Tom5";

export class Comando extends Command {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "timers",
                description: "[📒] Veja os seus timers",
                aliases: ["schedule"],
                usage: "t.timers",
                devOnly: false,
                userPermissions: ["SendMessages"],
                botPermissions: ["SendMessages", "EmbedLinks"]
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            const userDoc = await this.client.db.getOne(
                "users",
                {
                    _id: ctx.message?.author.id
                }
            )

            const dailyNextClaim = userDoc.economia.daily.nextClaim
            const dailyTimer = `> <t:${~~(dailyNextClaim / 1000)}:R>`

            ctx.interaction?.reply(
                {
                    content: `(${this.client._emojis.certo}) Timers carregados...`,
                    embeds: [
                        new EmbedBuilder()
                        .setColor("#2a2d31")
                        .setDescription(`**Olá ${ctx.message?.author}. Aqui estão os teus timers**`)
                        .addFields(
                            {
                                name: "Daily",
                                value: dailyTimer,
                                inline: false
                            }
                        )
                    ]
                }
            )
        }
    }
}