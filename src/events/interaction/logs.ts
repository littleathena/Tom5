import { EmbedBuilder } from "discord.js";
import Event from "../../classes/Event";
import Tom5 from "../../classes/Tom5";

export class Evento extends Event<"interactionCreate"> {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "interactionCreate",
                once: false
            }
        ),
        this.client = client
        this.execute = async (interaction) => {

            if(!interaction.isChatInputCommand()) return

            const channel = await this.client.channels.cache.get(process.env.LOGS_CHANNEL!)!

            if(!channel.isTextBased()) return
            if(!interaction.channel?.isTextBased()) return

            channel.send(
                {
                    embeds: [
                        new EmbedBuilder()
                        .setColor("#2a2d31")
                        .setFields(
                            [
                                {
                                    name: `<:tom5_icons_store:1013545540950184047> Comando`,
                                    value: `</${interaction.commandName}:${interaction.commandId}> \`/${interaction.commandName}\``,
                                    inline: false
                                },
                                {
                                    name: `<:tom5_icons_globe:1013545455898071100> Servidor`,
                                    value: `\`${interaction.guild?.name}\` - ${await interaction.guild?.fetchOwner()} \`${(await interaction.guild?.fetchOwner())?.user.tag} ${(await interaction.guild?.fetchOwner())?.id}\``,
                                    inline: false
                                },
                                {
                                    name: `<:tom5_icons_channel:1013544410677530786> Canal`,
                                    value: `${interaction.channel} \`${interaction
                                    .channel.id}\``,
                                    inline: false
                                },
                                {
                                    name: `<:tom5_icons_Person:1013543964726530089> Usuário`,
                                    value: `${interaction.user} - \`${interaction.user.tag} ${interaction.user.id}\``,
                                    inline: false
                                }
                            ]
                        )
                    ]
                }
            )
        }
    }
}