import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, Channel, ComponentType, EmbedBuilder, GuildBasedChannel, Role } from "discord.js";
import Command from "../../../classes/Command";
import Tom5 from "../../../classes/Tom5";
import { Collection } from "discord.js";

export class Comando extends Command {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "config",
                description: "[🎈] Configure algum sistema disponível",
                type: ApplicationCommandType.ChatInput,
                usage: "/config <subCommandsGroup> <options>",
                options: [
                    {
                        name: "parcerias",
                        description: "[🎈] Configure o sistema de parcerias",
                        type: ApplicationCommandOptionType.Subcommand,
                    }
                ]
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            if(!ctx.interaction?.isChatInputCommand()) return

            const subCommand = ctx.interaction?.options.getSubcommand()

            switch(subCommand) {
                case "parcerias": {

                    /**
                     * Embed de inicio
                     * tipo de parcerias: servidor
                     * parcerias servidor:
                     * - canal de parcerias
                     * - cargo(s) responsável(eis)
                     * - cargo de parceiros
                     */

                    var guildDoc = await this.client.db.getOne(
                        "guilds",
                        {
                            _id: ctx.interaction?.guild?.id
                        }
                    )

                    var partnersChannel = guildDoc.parcerias.canal
                    var staffRoles = guildDoc.parcerias.staffRoles
                    var partnersRole = guildDoc.parcerias.partnersRole

                    if(partnersChannel) {
                        partnersChannel = await this.client.channels.fetch(partnersChannel)!
                    } else {
                        partnersChannel = "\`Não configurado\`"
                    }

                    if(staffRoles.length > 0) {
                        let roles: Array<Role> = staffRoles.map((r: string) => this.client.guilds.cache.get(ctx.interaction?.guildId!)?.roles.cache.get(r))

                        staffRoles = roles.join(` `)
                    } else {
                        staffRoles = "\`Não configurado\`"
                    }

                    if(partnersRole) {
                        let role =ctx.interaction?.guild?.roles.cache.get(partnersRole)

                        partnersRole = role
                    } else {
                        partnersRole = "\`Não configurado\`"
                    }

                    const msg = await ctx.interaction?.reply(
                        {
                            embeds: [
                                new EmbedBuilder()
                                .setColor("#2a2d31")
                                .setDescription(`**Olá ${ctx.interaction?.user}! Segue as intruções abaixo para configures o sistema de parcerias.**\n\n>>> <:tom5_icons_channel:1013544410677530786> - Canal de parcerias: ${partnersChannel}\n<:tom5_icons_store:1013545540950184047> - Cargos staffs responsáveis: ${staffRoles}\n<:tom5_icons_partner:1013546823857746001> - Cargo parceiros: ${partnersRole}`)
                            ],
                            components: [
                                new ActionRowBuilder<ButtonBuilder>()
                                .addComponents(
                                    new ButtonBuilder()
                                    .setCustomId("config_channel_partners")
                                    .setEmoji(
                                        {
                                            animated: false,
                                            id: "1013544410677530786",
                                            name: "tom5_icons_channel"
                                        }
                                    )
                                    .setStyle(ButtonStyle.Secondary),

                                    new ButtonBuilder()
                                    .setCustomId("config_cargo_resp")
                                    .setEmoji(
                                        {
                                            animated: false,
                                            id: "1013545540950184047",
                                            name: "tom5_icons_store"
                                        }
                                    )
                                    .setStyle(ButtonStyle.Secondary),

                                    new ButtonBuilder()
                                    .setCustomId("config_cargo_partners")
                                    .setEmoji(
                                        {
                                            animated: false,
                                            id: "1013546823857746001",
                                            name: "tom5_icons_partner"
                                        }
                                    )
                                    .setStyle(ButtonStyle.Secondary)
                                )
                            ]
                        }
                    )

                    msg.createMessageComponentCollector(
                        {
                            componentType: ComponentType.Button,
                            time: 256000,
                            filter: (u) => u.user.id === ctx.interaction?.user.id
                        }
                    ).on("collect", async (i) => {

                        let id = i.customId

                        switch(id) {
                            case "config_channel_partners": {

                                const iMessage = await i.reply(
                                    {
                                        content: `(${this.client._emojis.load}) Envie o id ou mencione o canal de parcerias...`,
                                        ephemeral: true
                                    }
                                )

                                i.channel?.createMessageCollector(
                                    {
                                        filter: (u) => u.author.id === i.user.id,
                                        time: 256000,
                                        max: 1
                                    }
                                ).on("collect", async (i1) => {

                                    let channel: Channel | undefined = i.message.mentions.channels.first()

                                    if(!channel) channel = ctx.interaction?.guild?.channels.cache.get(i1.content)

                                    guildDoc = await this.client.db.updateOne(
                                        "guilds",
                                        {
                                            _id: ctx.interaction?.guild?.id
                                        },
                                        {
                                            $set: {
                                                "parcerias.canal": channel?.id
                                            }
                                        }
                                    )

                                    i1.delete()

                                    iMessage.delete()

                                    ctx.interaction?.followUp(
                                        {
                                            content: `(${this.client._emojis.certo}) Canal ${channel} configurado com sucesso.`,
                                            ephemeral: true
                                        }
                                    )
                                })

                                break
                            }
                            
                            case "config_cargo_resp": {

                                const iMessage = await i.reply(
                                    {
                                        content: `(${this.client._emojis.load}) Envie o(s) id(s) ou mencione o(s) cargo(s) de parcerias...\n\n**Nota**\n> Caso indique mais que um cargo, por id ou por menção, certefique-se que os separa por um espaço!`,
                                        ephemeral: true
                                    }
                                )

                                i.channel?.createMessageCollector(
                                    {
                                        filter: (u) => u.author.id === i.user.id,
                                        time: 256000,
                                        max: 1
                                    }
                                ).on("collect", async (i1) => {

                                    let roles: Collection<string, Role> | any[] | string = i.message.mentions.roles

                                    if(roles.size < 1) {
                                        roles = i1.content.split(` `).map(r => {
                                            ctx.interaction?.guild?.roles.cache.find(rl => rl.id == r)
                                        })
                                    } else {
                                        roles = roles.map(r => r)
                                    }

                                    roles = roles.map(async r => await r)

                                    console.log(roles)

                                    i1.channel.send(`\`\`\`js\n${roles}\`\`\``)

                                    guildDoc = await this.client.db.updateOne(
                                        "guilds",
                                        {
                                            _id: ctx.interaction?.guild?.id
                                        },
                                        {
                                            $set: {
                                                "parcerias.staffRoles": roles
                                            }
                                        }
                                    )

                                    i1.delete()

                                    iMessage.delete()

                                    // roles = roles.map(async r1 => await ctx.interaction?.guild?.roles.cache.find(await r1))

                                    // console.log(roles)

                                    ctx.interaction?.followUp(
                                        {
                                            content: `(${this.client._emojis.certo}) Cargo(s) /**/ configurado(s) com sucesso.`,
                                            ephemeral: true
                                        }
                                    )
                                })

                                break
                            }
                        }
                    })
                }
            }
        }
    }
}