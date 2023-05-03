import { ActionRowBuilder, ApplicationCommand, ApplicationCommandType, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import Command from "../../../classes/Command";
import Tom5 from "../../../classes/Tom5";

export class Comando extends Command {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "help",
                description: "[📒] Comando de ajuda",
                aliases: ["ajuda"],
                usage: "t.help",
                devOnly: false,
                userPermissions: ["SendMessages"],
                botPermissions: ["SendMessages", "EmbedLinks"]
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            const comandos = (await this.client.application?.commands.fetch()!).map(c => c)

            const categorias = ["[🧪]", "[🪙]", "[🎈]", "[🎵]", "[🤝]", "[📒]"]

            var devCommands: Array<any>, ecoCommands: Array<any>, genCommands: Array<any>, musicCommands: Array<any>, partnerCommands: Array<any>, utilCommands: Array<any>;

            for(let categoria of categorias) {

                switch(categoria) {
                    case "[🧪]": {

                        devCommands = comandos.filter(c => c.description.startsWith("[🧪]"))

                        break

                    }

                    case "[🪙]": {

                        ecoCommands = comandos.filter(c => c.description.startsWith("[🪙]"))

                        break

                    }

                    case "[🎈]": {

                        genCommands = comandos.filter(c => c.description.startsWith("[🎈]"))

                        break

                    }

                    case "[🎵]": {

                        musicCommands = comandos.filter(c => c.description.startsWith("[🎵]"))

                        break
                    }

                    case "[🤝]": {
                        partnerCommands = comandos.filter(c => c.description.startsWith("[🤝]"))

                        break
                    }

                    case "[📒]": {

                        utilCommands = comandos.filter(c => c.description.startsWith("[📒]"))

                        break
                    }
                }
            }

            var msg = await ctx.message?.reply(
                {
                    embeds: [
                        new EmbedBuilder()
                        .setColor("#2a2d31")
                        .setDescription(`**Olá ${ctx.message?.author}! Precisas de ajuda?**\n\n> Seleciona abaixo o tipo de ajuda que desjas receber.`)
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
            )!

            await msg.createMessageComponentCollector(
                {
                    componentType: ComponentType.Button,
                    time: 1 * 60 * 1000,
                    filter: (u) => u.user.id === ctx.message?.author.id
                }
            ).on("collect", async (i) => {

                i.deferUpdate()

                switch(i.customId) {
                    
                    case "help_commands": {

                        await msg.edit(
                            {
                                content: `(${this.client._emojis.load}) A carregar comandos...`,
                                embeds: [],
                                components: [],
                            }
                        )

                        await new Promise(resolve => setTimeout(resolve, 2500))

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
                                                    label: "Econommia",
                                                    value: "eco",
                                                    emoji: {
                                                        animated: false,
                                                        id: "1013544459503423618",
                                                        name: "tom5_icons_dollar"
                                                    }
                                                },
                                                {
                                                    label: "Gerais",
                                                    value: "gen",
                                                    emoji: {
                                                        animated: false,
                                                        id: "1013545455898071100",
                                                        name: "tom5_icons_globe"
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
                                                    label: "Parcerias",
                                                    value: "parcerias",
                                                    emoji: 
                                                    {
                                                        animated: false,
                                                        id: "1013546823857746001",
                                                        name: "tom5_icons_partner"
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
                                filter: (u) => u.user.id === ctx.message?.author.id
                            }
                        ).on("collect", async (i2) => {

                            switch(i2.values[0]) {

                                case "devs": {

                                    var msgDevCommands = ""

                                    for(let i = 0; i < devCommands.length; i++) {

                                        let devCmd: ApplicationCommand = devCommands[i]

                                        let cmd1: any = this.client.utils.commands.slash.get(devCmd.name)

                                        msgDevCommands += `- </${devCmd.name}:${devCmd.id}> ${devCmd.description.replace("[🧪] ", "")} [\`${cmd1?.usage}\`]\n`
                                    }

                                    msgDevCommands += `\n>>> **Legenda**\n- \`[]\` Parâmetros opcionais\n- \`()\` Parâmetros obrigatórios`

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
                                                                label: "Econommia",
                                                                value: "eco",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013544459503423618",
                                                                    name: "tom5_icons_dollar"
                                                                }
                                                            },
                                                            {
                                                                label: "Gerais",
                                                                value: "gen",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013545455898071100",
                                                                    name: "tom5_icons_globe"
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
                                                                label: "Parcerias",
                                                                value: "parcerias",
                                                                emoji: 
                                                                {
                                                                    animated: false,
                                                                    id: "1013546823857746001",
                                                                    name: "tom5_icons_partner"
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

                                case "eco": {

                                    var msgEcoCommands = ""

                                    for(let i = 0; i < ecoCommands.length; i++) {

                                        let ecoCmd: ApplicationCommand = ecoCommands[i]

                                        let cmd1: any = this.client.utils.commands.slash.get(ecoCmd.name)

                                        msgEcoCommands += `- </${ecoCmd.name}:${ecoCmd.id}> ${ecoCmd.description.replace("[🪙] ", "")} [\`${cmd1?.usage}\`]\n`
                                    }

                                    msgEcoCommands += `\n>>> **Legenda**\n- \`[]\` Parâmetros opcionais\n- \`()\` Parâmetros obrigatórios`

                                    i2.update(
                                        {
                                            content: msgEcoCommands,
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
                                                                label: "Econommia",
                                                                value: "eco",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013544459503423618",
                                                                    name: "tom5_icons_dollar"
                                                                },
                                                                default: true
                                                            },
                                                            {
                                                                label: "Gerais",
                                                                value: "gen",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013545455898071100",
                                                                    name: "tom5_icons_globe"
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
                                                                label: "Parcerias",
                                                                value: "parcerias",
                                                                emoji: 
                                                                {
                                                                    animated: false,
                                                                    id: "1013546823857746001",
                                                                    name: "tom5_icons_partner"
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

                                case "gen": {

                                    var msgGenCommands = ""

                                    for(let i = 0; i < genCommands.length; i++) {

                                        let genCmd: ApplicationCommand = genCommands[i]

                                        let cmd1: any = this.client.utils.commands.slash.get(genCmd.name)

                                        msgGenCommands += `- </${genCmd.name}:${genCmd.id}> ${genCmd.description.replace("[🎈] ", "")} [\`${cmd1?.usage}\`]\n`
                                    }

                                    msgGenCommands += `\n>>> **Legenda**\n- \`[]\` Parâmetros opcionais\n- \`()\` Parâmetros obrigatórios`

                                    i2.update(
                                        {
                                            content: msgGenCommands,
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
                                                                label: "Econommia",
                                                                value: "eco",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013544459503423618",
                                                                    name: "tom5_icons_dollar"
                                                                }
                                                            },
                                                            {
                                                                label: "Gerais",
                                                                value: "gen",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013545455898071100",
                                                                    name: "tom5_icons_globe"
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
                                                                label: "Parcerias",
                                                                value: "parcerias",
                                                                emoji: 
                                                                {
                                                                    animated: false,
                                                                    id: "1013546823857746001",
                                                                    name: "tom5_icons_partner"
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

                                        let cmd2: any = this.client.utils.commands.slash.get(musicCmd.name)

                                        msgMusicCommands += `- </${musicCmd.name}:${musicCmd.id}> ${musicCmd.description.replace("[🎵] ", "")} [\`${cmd2?.usage}\`]\n`
                                    }

                                    msgMusicCommands += `\n>>> **Legenda**\n- \`[]\` Parâmetros opcionais\n- \`()\` Parâmetros obrigatórios`

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
                                                                label: "Econommia",
                                                                value: "eco",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013544459503423618",
                                                                    name: "tom5_icons_dollar"
                                                                }
                                                            },
                                                            {
                                                                label: "Gerais",
                                                                value: "gen",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013545455898071100",
                                                                    name: "tom5_icons_globe"
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
                                                                label: "Parcerias",
                                                                value: "parcerias",
                                                                emoji: 
                                                                {
                                                                    animated: false,
                                                                    id: "1013546823857746001",
                                                                    name: "tom5_icons_partner"
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

                                case "parcerias": {

                                    var msgParceCommands = ""

                                    for(let i = 0; i < partnerCommands.length; i++) {

                                        let parceCmd: ApplicationCommand = partnerCommands[i]

                                        let cmd2: any = this.client.utils.commands.slash.get(parceCmd.name)

                                        msgParceCommands += `- </${parceCmd.name}:${parceCmd.id}> ${parceCmd.description.replace("[🤝] ", "")} [\`${cmd2?.usage}\`]\n`
                                    }

                                    msgParceCommands += `\n>>> **Legenda**\n- \`[]\` Parâmetros opcionais\n- \`()\` Parâmetros obrigatórios`

                                    i2.update(
                                        {
                                            content: msgParceCommands,
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
                                                                label: "Econommia",
                                                                value: "eco",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013544459503423618",
                                                                    name: "tom5_icons_dollar"
                                                                }
                                                            },
                                                            {
                                                                label: "Gerais",
                                                                value: "gen",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013545455898071100",
                                                                    name: "tom5_icons_globe"
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
                                                                label: "Parcerias",
                                                                value: "parcerias",
                                                                emoji: 
                                                                {
                                                                    animated: false,
                                                                    id: "1013546823857746001",
                                                                    name: "tom5_icons_partner"
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

                                        let cmd3: any = this.client.utils.commands.slash.get(utilCmd.name)

                                        msgUtilCommands += `- </${utilCmd.name}:${utilCmd.id}> ${utilCmd.description.replace("[📒] ", "")} [\`${cmd3?.usage}\`]\n`
                                    }

                                    msgUtilCommands += `\n>>> **Legenda**\n- \`[]\` Parâmetros opcionais\n- \`()\` Parâmetros obrigatórios`

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
                                                                label: "Econommia",
                                                                value: "eco",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013544459503423618",
                                                                    name: "tom5_icons_dollar"
                                                                }
                                                            },
                                                            {
                                                                label: "Gerais",
                                                                value: "gen",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013545455898071100",
                                                                    name: "tom5_icons_globe"
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
                                                                label: "Parcerias",
                                                                value: "parcerias",
                                                                emoji: 
                                                                {
                                                                    animated: false,
                                                                    id: "1013546823857746001",
                                                                    name: "tom5_icons_partner"
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

                        await msg.edit(
                            {
                                content: `(${this.client._emojis.load}) A carregar sistemas...`,
                                embeds: [],
                                components: []
                            }
                        )

                        const sistemas = [
                            {
                                name: "Música",
                                description: "Reproduz músicas através de __Lavalink__. Aceita **todas as plataformas de streaming** (\`Spotify\`, \`SoundCloud\`, \`Deezer\`, etc) menos o \`YouTube\` (por direitos da Google).",
                                commands: [],
                                infosAdd: null
                            },
                            {
                                name: "Parcerias",
                                description: "Parcerias feitas com o Tom5 e/ou o servidor do seu criador (TomG). Sistema disponível também localmente para servidores.",
                                commands: ["config parcerias", "parceria"],
                                infosAdd: "No caso de parcerias com o bot, tudo o que precisa fazer para entrar em contacto com a equipa de parcerias é enviar mensagem no privado do Tom5 escrito **\`t.parceria\`**, e seguir as indicações do bot."
                            }
                        ]

                        await new Promise(resolve => setTimeout(resolve, 2500))

                        await msg.edit(
                            {
                                content: `(${this.client._emojis.certo}) Carreguei todos os meus sistemas.`,
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor("#2a2d31")
                                    .setDescription(`> Seleciona o sistema abaixo.`)
                                ],
                                components: [
                                    new ActionRowBuilder<StringSelectMenuBuilder>()
                                    .addComponents(
                                        new StringSelectMenuBuilder()
                                        .setCustomId("help_systems_menu")
                                        .setPlaceholder("Selecionar Sistema")
                                        .setOptions(
                                            [
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
                                                    label: "Parcerias",
                                                    value: "parcerias",
                                                    emoji: {
                                                        animated: false,
                                                        id: "1013546823857746001",
                                                        name: "tom5_icons_partner"
                                                    }
                                                },
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
                                filter: (u) => u.user.id === ctx.message?.author.id
                            },
                        ).on("collect", async (i) => {

                            let cmds = async (x: number) => {

                                let string = ""

                                for(let c of sistemas[x].commands) {

                                    let cmd = (await this.client.application?.commands.fetch())?.filter(a => a.name === c).map(a => a)[0]

                                    const split = c.split(` `)

                                    if(!cmd && split.length > 0) {
                                        let cmd1 = (await this.client.application?.commands.fetch())?.filter(a => a.name === split[0]).map(a => a)[0]
                                        let cmd1_1 = cmd1?.options.filter(x => x.name == split[1])[0]
                                        let cmd2: any = this.client.utils.commands.slash.get(cmd1?.name!)

                                        let desc = cmd1?.description.replace("[🧪] ", "")?.replace("[🪙]", "")?.replace("[🎈]", "")?.replace("[🎵] ", "")?.replace("[🤝]", "")?.replace("[📒] ", "")

                                        string += `> - </${cmd1?.name} ${cmd1_1?.name}:${cmd1?.id}> ${desc} [\`${cmd2.usage}\`]\n`
                                    } else {
                                        let cmd2: any = this.client.utils.commands.slash.get(c)

                                        // "[🧪]", "[🪙]", "[🎈]", "[🎵]", "[🤝]", "[📒]"

                                        let desc = cmd?.description.replace("[🧪] ", "")?.replace("[🪙]", "")?.replace("[🎈]", "")?.replace("[🎵] ", "")?.replace("[🤝]", "")?.replace("[📒] ", "")

                                        string += `> - </${cmd?.name}:${cmd?.id}> ${desc} [\`${cmd2.usage}\`]\n`
                                    }
                                }

                                return string
                            }

                            switch(i.values[0]) {

                                case "music": {

                                    let res;

                                    if(sistemas[0].commands.length > 0) {
                                        res = await cmds(0)
                                    } else {
                                        res = `\`Sem comandos registados\``
                                    }

                                    i.update(
                                        {
                                            content: `(<:tom5_icons_OAuth2:1013547865194377338>) Sistema: **\`${sistemas[0].name}\`**\n(<:tom5_icons_richpresence:1013546742383382549>) Descrição:\n> ${sistemas[0].description}\n(<:tom5_icons_store:1013545540950184047>) Comandos associados: \n${res}`,
                                            embeds: [],
                                            components: [
                                                new ActionRowBuilder<StringSelectMenuBuilder>()
                                                .addComponents(
                                                    new StringSelectMenuBuilder()
                                                    .setCustomId("help_systems_menu")
                                                    .setPlaceholder("Selecionar Sistema")
                                                    .setOptions(
                                                        [
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
                                                                label: "Parcerias",
                                                                value: "parcerias",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013546823857746001",
                                                                    name: "tom5_icons_partner"
                                                                }
                                                            },
                                                        ]
                                                    )
                                                )
                                            ]
                                        }
                                    )

                                    break
                                }

                                case "parcerias": {

                                    let res;

                                    if(sistemas[1].commands.length > 0) {
                                        res = await cmds(1)
                                    } else {
                                        res = `\`Sem comandos registados\``
                                    }

                                    i.update(
                                        {
                                            content: `(<:tom5_icons_OAuth2:1013547865194377338>) Sistema: **\`${sistemas[1].name}\`**\n(<:tom5_icons_richpresence:1013546742383382549>) Descrição:\n> ${sistemas[1].description}\n(<:tom5_icons_store:1013545540950184047>) Comandos associados: \n${res}`,
                                            embeds: [],
                                            components: [
                                                new ActionRowBuilder<StringSelectMenuBuilder>()
                                                .addComponents(
                                                    new StringSelectMenuBuilder()
                                                    .setCustomId("help_systems_menu")
                                                    .setPlaceholder("Selecionar Sistema")
                                                    .setOptions(
                                                        [
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
                                                                label: "Parcerias",
                                                                value: "parcerias",
                                                                emoji: {
                                                                    animated: false,
                                                                    id: "1013546823857746001",
                                                                    name: "tom5_icons_partner"
                                                                },
                                                                default: true
                                                            },
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
                }
            })
        }
    }
}