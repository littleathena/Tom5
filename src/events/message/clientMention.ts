import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import Event from "../../classes/Event";
import Tom5 from "../../classes/Tom5";

export class Evento extends Event<"messageCreate"> {

    client: Tom5;

    constructor(client: Tom5) {
        super(
            {
                name: "messageCreate",
                once: false
            }
        )
        this.client = client
        this.execute = async (message) => {

            if(message.author.bot) return

            if(message.content !== `<@${this.client.user?.id}>`) return


            message.reply(
                {
                    content: `**>>> (<:tom5_icons_wave:1014591822057713674>) Olá ${message.author}, precisas de ajuda?\n(<:tom5_icons_store:1013545540950184047>) O meu prefixo é \`t.\` ou \`/\`\n(<:tom5_icons_info:1013545468933972140>) Comando de ajuda: </help:1094936402615095396>\n(<:tom5_icons_question:1013546739170558135>) Mais informações em </botinfo:123456>**`,
                    components: [
                        new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            new ButtonBuilder()
                            .setLabel("Adiciona-me!")
                            .setEmoji(
                                {
                                    animated: false,
                                    id: "1013545489980981308",
                                    name: "tom5_icons_link"
                                }
                            )
                            .setStyle(ButtonStyle.Link)
                            .setURL("https://canary.discord.com/api/oauth2/authorize?client_id=1079120730983235615&permissions=1099749969286&scope=applications.commands%20bot")
                        )
                    ]
                }
            )
        }
    }
}