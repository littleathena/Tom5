import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import Command from "../../../classes/Command";
import Tom5 from "../../../classes/Tom5";
import userModel from "../../../database/models/userModel";

export class Comando extends Command {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "atm",
                description: "[🪙] Mostra o saldo de tomCoins",
                usage: "t.atm",
                botPermissions: [
                    "SendMessages"
                ]
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            let user = ctx.message?.mentions.members?.first() || ctx.message?.guild?.members.cache.get(ctx.args![0]) || ctx.message?.member!

            let reward = Math.floor((Math.random() * 1000) + 400)

            const carteira = await this.client.db.getOne(
                "users",
                {
                    _id: user.id
                }
            ).then(doc => doc.economia.wallet) || 0

            const banco = await this.client.db.getOne(
                "users",
                {
                    _id: user.id
                }
            ).then(doc => doc.economia.bank) || 0

            ctx.message?.reply(
                {
                    embeds: [
                        new EmbedBuilder()
                            .setColor("#2a2d31")
                            .setDescription(`Carteira: ${carteira}\nBanco: ${banco}`)
                    ]
                }
            )
        }
    }
}
