import { ActionRowBuilder, ApplicationCommand, ApplicationCommandType, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import Command from "../../classes/Command";
import Tom5 from "../../classes/Tom5";

export class Comando extends Command {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "help",
                description: "[📒] Comando de ajuda",
                type: ApplicationCommandType.ChatInput,
                usage: "/help",
                devOnly: false,
                userPermissions: ["SendMessages"],
                botPermissions: ["SendMessages", "ManageMessages", "EmbedLinks"]
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            const comandos = (await this.client.application?.commands.fetch()!).map(c => c)

            const categorias = ["[🧪]", "[🎵]", "[📒]"]

            var devCommands: Array<any>, musicCommands: Array<any>, utilCommands: Array<any>;

            for(let categoria of categorias) {

                switch(categoria) {
                    case "[🧪]": {

                        devCommands = comandos.filter(c => c.description.startsWith("[🧪]"))
                        // devCommands = devCommands.map(c => c.description.replace("[🧪]", ""))

                        break

                    }

                    case "[🎵]": {

                        musicCommands = comandos.filter(c => c.description.startsWith("[🎵]"))
                        // musicCommands = musicCommands.map(c => c.description.replace("[🎵]", ""))

                        break
                    }

                    case "[📒]": {

                        utilCommands = comandos.filter(c => c.description.startsWith("[📒]"))
                        // utilCommands = utilCommands.map(c => c.description.replace("[📒]", ""))

                        break
                    }
                }
            }

            var msg = await ctx.interaction.reply(
                {
                    embeds: [
                        new EmbedBuilder()
                        .setColor("#2a2d31")
                        .setDescription(`**Olá ${ctx.interaction.user}! Precisas de ajuda?**\n\n> Seleciona abaixo o tipo de ajuda que desjas receber.`)
                    ],
                    components: [
                        new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            new ButtonBuilder()
                            .setCustomId("help_commands")
                            .setLabel("Comandos")
                            .setEmoji(
                                {
                                    animated: false,
                                    id: "1013545551100383355",
                                    name: "tom5_icons_supportscommandsbadge"
                                }
                            )
                            .setStyle(ButtonStyle.Secondary),

                            new ButtonBuilder()
                            .setCustomId("help_systems")
                            .setLabel("Sistemas")
                            .setEmoji(
                                {
                                    animated: false,
                                    id: "1013547865194377338",
                                    name: "tom5_icons_OAuth2"
                                }
                            )
                            .setStyle(ButtonStyle.Secondary)
                        )
                    ]
                }
            )

            await msg.createMessageComponentCollector(
                {
                    componentType: ComponentType.Button,
                    time: 1 * 60 * 1000,
                    filter: (u) => u.user.id === ctx.interaction.user.id
                }
            ).on("collect", async (i) => {

                switch(i.customId) {
                    
                    case "help_commands": {

                        await msg.edit(
                            {
                                content: `(${this.client._emojis.load}) A carregar comandos...`,
                                embeds: [],
                                components: []
                            }
                        )

                        await new Promise(resolve => setTimeout(resolve, 5000))

                        await msg.edit(
                            {
                                content: `(${this.client._emojis.certo}) Carreguei todos os meus comandos.`,
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor("#2a2d31")
                                    .setDescription(`> Seleciona a categoria de comandos abaixo.`)
                                ],
                                components: [
                                    new ActionRowBuilder<StringSelectMenuBuilder>()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId("help_commands_menu")
                                        .setPlaceholder("Selecionar Categoria")
                                        .setOptions(
                                            [
                                                {
                                                    label: "Desenvolvedores",
                                                    value: "devs",
                                                    emoji: {
                                                        animated: false,
                                                        id: "1013546693997891615",
                                                        name: "tom5_icons_code"
                                                    }
                                                },
                                                {
                                                    label: "Música",
                                                    value: "music",
                                                    emoji: {
                                                        animated: false,
                                                        id: "1013546723018285199",
                                                        name: "tom5_icons_music"
                                                    }
                                                },
                                                {
                                                    label: "Úteis",
                                                    value: "utils",
                                                    emoji: {
                                                        animated: false,
                                                        id: "1013544466398855258",
                                                        name: "tom5_icons_file"
                                                    }
                                                }
                                            ]
                                        )
                                    )
                                ]
                            }
                        )

                        await msg.createMessageComponentCollector(
                            {
                                componentType: ComponentType.StringSelect,
                                time: 10 * 60 * 1000,
                                filter: (u) => u.user.id === ctx.interaction.user.id
                            }
                        ).on("collect", async (i2) => {

                            switch(i2.values[0]) {

                                case "devs": {

                                    var msgDevCommands = ""

                                    for(let i = 0; i < devCommands.length; i++) {

                                        let devCmd: ApplicationCommand = devCommands[i]

                                        let cmd1: any = this.client.utils.commands.get(devCmd.name)

                                        msgDevCommands += `- </${devCmd.name}:${devCmd.id}> ${devCmd.description.replace("[🧪] ", "")} [\`${cmd1?.usage}\`]\n`
                                    }

                                    i2.update(
                                        {
                                            content: msgDevCommands,
                                            embeds: [],
                                            components: [
                                                new ActionRowBuilder<StringSelectMenuBuilder>()
                                                .addComponents(
                                                    new StringSelectMenuBuilder()
                                                    .setCustomId("help_commands_menu")
                                                    .setPlaceholder("Selecionar Categoria")
                                                    .setOptions(
                                                        [
                                                            {
                                                                label: "Desenvolvedores",
                                                                value: "devs",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013546693997891615",
                                                                    name: "tom5_icons_code"
                                                                },
                                                                default: true
                                                            },
                                                            {
                                                                label: "Música",
                                                                value: "music",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013546723018285199",
                                                                    name: "tom5_icons_music"
                                                                }
                                                            },
                                                            {
                                                                label: "Úteis",
                                                                value: "utils",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013544466398855258",
                                                                    name: "tom5_icons_file"
                                                                }
                                                            }
                                                        ]
                                                    )
                                                )
                                            ]
                                        }
                                    )

                                    break
                                }

                                case "music": {

                                    var msgMusicCommands = ""

                                    for(let i = 0; i < musicCommands.length; i++) {

                                        let musicCmd: ApplicationCommand = musicCommands[i]

                                        let cmd2: any = this.client.utils.commands.get(musicCmd.name)

                                        msgMusicCommands += `- </${musicCmd.name}:${musicCmd.id}> ${musicCmd.description.replace("[🎵] ", "")} [\`${cmd2?.usage}\`]\n`
                                    }

                                    i2.update(
                                        {
                                            content: msgMusicCommands,
                                            embeds: [],
                                            components: [
                                                new ActionRowBuilder<StringSelectMenuBuilder>()
                                                .addComponents(
                                                    new StringSelectMenuBuilder()
                                                    .setCustomId("help_commands_menu")
                                                    .setPlaceholder("Selecionar Categoria")
                                                    .setOptions(
                                                        [
                                                            {
                                                                label: "Desenvolvedores",
                                                                value: "devs",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013546693997891615",
                                                                    name: "tom5_icons_code"
                                                                }
                                                            },
                                                            {
                                                                label: "Música",
                                                                value: "music",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013546723018285199",
                                                                    name: "tom5_icons_music"
                                                                },
                                                                default: true
                                                            },
                                                            {
                                                                label: "Úteis",
                                                                value: "utils",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013544466398855258",
                                                                    name: "tom5_icons_file"
                                                                }
                                                            }
                                                        ]
                                                    )
                                                )
                                            ]
                                        }
                                    )

                                    break
                                }

                                case "utils": {

                                    var msgUtilCommands = ""

                                    for(let i = 0; i < utilCommands.length; i++) {

                                        let utilCmd: ApplicationCommand = utilCommands[i]

                                        let cmd3: any = this.client.utils.commands.get(utilCmd.name)

                                        msgUtilCommands += `- </${utilCmd.name}:${utilCmd.id}> ${utilCmd.description.replace("[📒] ", "")} [\`${cmd3?.usage}\`]\n`
                                    }

                                    i2.update(
                                        {
                                            content: msgUtilCommands,
                                            embeds: [],
                                            components: [
                                                new ActionRowBuilder<StringSelectMenuBuilder>()
                                                .addComponents(
                                                    new StringSelectMenuBuilder()
                                                    .setCustomId("help_commands_menu")
                                                    .setPlaceholder("Selecionar Categoria")
                                                    .setOptions(
                                                        [
                                                            {
                                                                label: "Desenvolvedores",
                                                                value: "devs",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013546693997891615",
                                                                    name: "tom5_icons_code"
                                                                }
                                                            },
                                                            {
                                                                label: "Música",
                                                                value: "music",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013546723018285199",
                                                                    name: "tom5_icons_music"
                                                                }
                                                            },
                                                            {
                                                                label: "Úteis",
                                                                value: "utils",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013544466398855258",
                                                                    name: "tom5_icons_file"
                                                                },
                                                                default: true
                                                            }
                                                        ]
                                                    )
                                                )
                                            ]
                                        }
                                    )

                                    break
                                }
                            }
                        })

                        break
                    }

                    case "help_systems": {


                        break
                    }
                }
            })
        }
    }
}