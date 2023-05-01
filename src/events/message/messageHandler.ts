import { ChannelType, EmbedBuilder } from "discord.js";
import Event from "../../classes/Event";
import Tom5 from "../../classes/Tom5";
import CommandContext from "../../managers/commandContext";

export class Evento extends Event<"messageCreate"> {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "messageCreate",
                once: false
            }
        ),
        this.client = client,
        this.execute = async (message) => {

            if(message.author.bot) return

            var prefix;

            const mentionRegex = message.content.match(
                new RegExp(`^<@!?(${this.client.user?.id})>`, 'gi')
            )

            if(mentionRegex) {
                prefix = String(mentionRegex)
            } else if(message.content.startsWith('tom5 ')) {
                prefix = 'tom5'
            } else if(message.content.startsWith('TOM5 ')) {
                prefix = 'TOM5'
            } else {
                prefix = this.client.prefix
            }

            if(!message.content.toLocaleLowerCase().startsWith(prefix.toString())) return
            if(!message.content.startsWith(prefix.toString())) return

            const args = message.content.slice(prefix.length).trim().split(" ")

            var messageCommand = args.shift()?.toLowerCase()

            if(!messageCommand || !messageCommand.length || !message.content) return

            try {

                let comando: any = this.client.utils.commands.prefix.get(messageCommand) || this.client.utils.aliases.get(messageCommand)

                const ctx = new CommandContext(this.client, undefined, message, args)

                if(!comando.dmPerm && message.channel.isDMBased()) return

                comando.execute({ ctx })

            } catch (err) {

                message.reply(
                    {
                        embeds: [
                            new EmbedBuilder()
                            .setColor("#2a2d31")
                            .setDescription(`(${this.client._emojis.errado}) O comando \`${messageCommand}\` não existe`)
                        ]
                    }
                )
            }
        }
    }
}