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
                usage: "t.config <options>",
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            const subCommand = ctx.args![0]

            switch(subCommand) {
                case "parcerias": {

                    var guildDoc = await this.client.db.getOne(
                        "guilds",
                        {
                            _id: ctx.message?.guild?.id
                        }
                    )

                    var partnersChannel = guildDoc.parcerias.canal
                    var staffRoles = guildDoc.parcerias.staffRoles
                    var partnersRole = guildDoc.parcerias.partnersRole
                    var pingRole = guildDoc.parcerias.pingRole

                    if(partnersChannel) {
                        partnersChannel = await this.client.channels.fetch(partnersChannel)
                    } else {
                        partnersChannel = "\`Não configurado\`"
                    }

                    if(staffRoles.length > 0) {
                        let roles: Array<Role> = staffRoles.map((r: string) => this.client.guilds.cache.get(ctx.message?.guildId!)?.roles.cache.get(r))

                        staffRoles = roles.join(` `)
                    } else {
                        staffRoles = "\`Não configurado\`"
                    }

                    if(partnersRole) {
                        let role = ctx.message?.guild?.roles.cache.get(partnersRole)

                        partnersRole = role
                    } else {
                        partnersRole = "\`Não configurado\`"
                    }

                    if(pingRole) {
                        let role = ctx.message?.guild?.roles.cache.get(pingRole)

                        pingRole = role
                    } else {
                        pingRole = "\`Não configurado\`"
                    }

                    const msg = await ctx.message?.reply(
                        {
                            embeds: [
                                new EmbedBuilder()
                                .setColor("#2a2d31")
                                .setDescription(`**Olá ${ctx.message?.author}! Segue as intruções abaixo para configures o sistema de parcerias.**\n\n>>> <:tom5_icons_channel:1013544410677530786> - Canal de parcerias: ${partnersChannel}\n<:tom5_icons_store:1013545540950184047> - Cargos staffs responsáveis: ${staffRoles}\n<:tom5_icons_partner:1013546823857746001> - Cargo parceiros: ${partnersRole}\n<:tom5_icons_timer:1023251410776768572> - Ping (Nova parceria): ${pingRole}`)
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
                                    .setStyle(ButtonStyle.Secondary),

                                    new ButtonBuilder()
                                    .setCustomId("config_ping")
                                    .setEmoji(
                                        {
                                            animated: false,
                                            id: "1023251410776768572",
                                            name: "tom5_icons_timer"
                                        }
                                    )
                                    .setStyle(ButtonStyle.Secondary),
                                )
                            ]
                        }
                    )!

                    msg.createMessageComponentCollector(
                        {
                            componentType: ComponentType.Button,
                            time: 256000,
                            filter: (u) => u.user.id === ctx.message?.author.id
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

                                    let channel: any = i1.mentions.channels.first()

                                    if(!channel) channel = await ctx.message?.guild?.channels.fetch(i1.content)

                                    await this.client.db.updateOne(
                                        "guilds",
                                        {
                                            _id: ctx.message?.guild?.id
                                        },
                                        {
                                            $set: {
                                                "parcerias.canal": channel.id
                                            }
                                        }
                                    )

                                    guildDoc = await this.client.db.getOne(
                                        "guilds",
                                        {
                                            _id: ctx.message?.guild?.id
                                        }
                                    )
                
                                    partnersChannel = guildDoc.parcerias.canal
                                    staffRoles = guildDoc.parcerias.staffRoles
                                    partnersRole = guildDoc.parcerias.partnersRole
                                    pingRole = guildDoc.parcerias.pingRole

                                    if(partnersChannel) {
                                        partnersChannel = await this.client.channels.fetch(partnersChannel)
                                    } else {
                                        partnersChannel = "\`Não configurado\`"
                                    }
                
                                    if(staffRoles.length > 0) {
                                        let roles: Array<Role> = staffRoles.map((r: string) => this.client.guilds.cache.get(ctx.message?.guildId!)?.roles.cache.get(r))
                
                                        staffRoles = roles.join(` `)
                                    } else {
                                        staffRoles = "\`Não configurado\`"
                                    }
                
                                    if(partnersRole) {
                                        let role = ctx.message?.guild?.roles.cache.get(partnersRole)
                
                                        partnersRole = role
                                    } else {
                                        partnersRole = "\`Não configurado\`"
                                    }
                
                                    if(pingRole) {
                                        let role = ctx.message?.guild?.roles.cache.get(pingRole)
                
                                        pingRole = role
                                    } else {
                                        pingRole = "\`Não configurado\`"
                                    }

                                    i?.followUp(
                                        {
                                            content: `(${this.client._emojis.certo}) Canal ${partnersChannel} configurado com sucesso.`,
                                            ephemeral: true
                                        }
                                    )

                                    iMessage.delete()
                                    i1.delete()

                                    await msg.edit(
                                        {
                                            embeds: [
                                                new EmbedBuilder()
                                                .setColor("#2a2d31")
                                                .setDescription(`**Olá ${ctx.message?.author}! Segue as intruções abaixo para configures o sistema de parcerias.**\n\n>>> <:tom5_icons_channel:1013544410677530786> - Canal de parcerias: ${partnersChannel}\n<:tom5_icons_store:1013545540950184047> - Cargos staffs responsáveis: ${staffRoles}\n<:tom5_icons_partner:1013546823857746001> - Cargo parceiros: ${partnersRole}\n<:tom5_icons_timer:1023251410776768572> - Ping (Nova parceria): ${pingRole}`)
                                            ]
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

                                    let roles: any = i1.mentions.roles

                                    if(roles.size < 1) {
                                        roles = i1.content.split(` `).map((r) => {
                                            return i.guild?.roles.cache.get(r)?.id                                           
                                        })
                                    } else {
                                        roles = roles.map((r: any) => r)
                                    }

                                    await this.client.db.updateOne(
                                        "guilds",
                                        {
                                            _id: ctx.message?.guild?.id
                                        },
                                        {
                                            $set: {
                                                "parcerias.staffRoles": roles
                                            }
                                        }
                                    )

                                    guildDoc = await this.client.db.getOne(
                                        "guilds",
                                        {
                                            _id: ctx.message?.guild?.id
                                        }
                                    )
                
                                    partnersChannel = guildDoc.parcerias.canal
                                    staffRoles = guildDoc.parcerias.staffRoles
                                    partnersRole = guildDoc.parcerias.partnersRole
                                    pingRole = guildDoc.parcerias.pingRole

                                    if(partnersChannel) {
                                        partnersChannel = await this.client.channels.fetch(partnersChannel)
                                    } else {
                                        partnersChannel = "\`Não configurado\`"
                                    }
                
                                    if(staffRoles.length > 0) {
                                        let roles: Array<Role> = staffRoles.map((r: string) => this.client.guilds.cache.get(ctx.message?.guildId!)?.roles.cache.get(r))
                
                                        staffRoles = roles.join(` `)
                                    } else {
                                        staffRoles = "\`Não configurado\`"
                                    }
                
                                    if(partnersRole) {
                                        let role = ctx.message?.guild?.roles.cache.get(partnersRole)
                
                                        partnersRole = role
                                    } else {
                                        partnersRole = "\`Não configurado\`"
                                    }
                
                                    if(pingRole) {
                                        let role = ctx.message?.guild?.roles.cache.get(pingRole)
                
                                        pingRole = role
                                    } else {
                                        pingRole = "\`Não configurado\`"
                                    }

                                    i?.followUp(
                                        {
                                            content: `(${this.client._emojis.certo}) Cargo(s) ${staffRoles} configurado(s) com sucesso.`,
                                            ephemeral: true
                                        }
                                    )

                                    iMessage.delete()
                                    i1.delete()

                                    await msg.edit(
                                        {
                                            embeds: [
                                                new EmbedBuilder()
                                                .setColor("#2a2d31")
                                                .setDescription(`**Olá ${ctx.message?.author}! Segue as intruções abaixo para configures o sistema de parcerias.**\n\n>>> <:tom5_icons_channel:1013544410677530786> - Canal de parcerias: ${partnersChannel}\n<:tom5_icons_store:1013545540950184047> - Cargos staffs responsáveis: ${staffRoles}\n<:tom5_icons_partner:1013546823857746001> - Cargo parceiros: ${partnersRole}\n<:tom5_icons_timer:1023251410776768572> - Ping (Nova parceria): ${pingRole}`)
                                            ]
                                        }
                                    )
                                })

                                break
                            }

                            case "config_cargo_partners": {

                                const iMessage = await i.reply(
                                    {
                                        content: `(${this.client._emojis.load}) Envie o id ou mencione o cargo de parceiros...`,
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

                                    let role: any = i1.mentions.roles.first()

                                    if(!role) role = ctx.message?.guild?.roles.cache.get(i1.content)

                                    await this.client.db.updateOne(
                                        "guilds",
                                        {
                                            _id: ctx.message?.guild?.id
                                        },
                                        {
                                            $set: {
                                                "parcerias.partnersRole": role.id
                                            }
                                        }
                                    )

                                    guildDoc = await this.client.db.getOne(
                                        "guilds",
                                        {
                                            _id: ctx.message?.guild?.id
                                        }
                                    )
                
                                    partnersChannel = guildDoc.parcerias.canal
                                    staffRoles = guildDoc.parcerias.staffRoles
                                    partnersRole = guildDoc.parcerias.partnersRole
                                    pingRole = guildDoc.parcerias.pingRole

                                    if(partnersChannel) {
                                        partnersChannel = await this.client.channels.fetch(partnersChannel)
                                    } else {
                                        partnersChannel = "\`Não configurado\`"
                                    }
                
                                    if(staffRoles.length > 0) {
                                        let roles: Array<Role> = staffRoles.map((r: string) => this.client.guilds.cache.get(ctx.message?.guildId!)?.roles.cache.get(r))
                
                                        staffRoles = roles.join(` `)
                                    } else {
                                        staffRoles = "\`Não configurado\`"
                                    }
                
                                    if(partnersRole) {
                                        let role = ctx.message?.guild?.roles.cache.get(partnersRole)
                
                                        partnersRole = role
                                    } else {
                                        partnersRole = "\`Não configurado\`"
                                    }
                
                                    if(pingRole) {
                                        let role = ctx.message?.guild?.roles.cache.get(pingRole)
                
                                        pingRole = role
                                    } else {
                                        pingRole = "\`Não configurado\`"
                                    }

                                    i?.followUp(
                                        {
                                            content: `(${this.client._emojis.certo}) Cargo ${partnersRole} configurado com sucesso.`,
                                            ephemeral: true
                                        }
                                    )

                                    iMessage.delete()
                                    i1.delete()

                                    await msg.edit(
                                        {
                                            embeds: [
                                                new EmbedBuilder()
                                                .setColor("#2a2d31")
                                                .setDescription(`**Olá ${ctx.message?.author}! Segue as intruções abaixo para configures o sistema de parcerias.**\n\n>>> <:tom5_icons_channel:1013544410677530786> - Canal de parcerias: ${partnersChannel}\n<:tom5_icons_store:1013545540950184047> - Cargos staffs responsáveis: ${staffRoles}\n<:tom5_icons_partner:1013546823857746001> - Cargo parceiros: ${partnersRole}\n<:tom5_icons_timer:1023251410776768572> - Ping (Nova parceria): ${pingRole}`)
                                            ]
                                        }
                                    )
                                })

                                break
                            }

                            case "config_ping": {

                                const iMessage = await i.reply(
                                    {
                                        content: `(${this.client._emojis.load}) Envie o id ou mencione o cargo de ping de nova parceria...`,
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

                                    let role: any = i1.mentions.roles.first()

                                    if(!role) role = ctx.message?.guild?.roles.cache.get(i1.content)

                                    await this.client.db.updateOne(
                                        "guilds",
                                        {
                                            _id: ctx.message?.guild?.id
                                        },
                                        {
                                            $set: {
                                                "parcerias.pingRole": role.id
                                            }
                                        }
                                    )

                                    guildDoc = await this.client.db.getOne(
                                        "guilds",
                                        {
                                            _id: ctx.message?.guild?.id
                                        }
                                    )
                
                                    partnersChannel = guildDoc.parcerias.canal
                                    staffRoles = guildDoc.parcerias.staffRoles
                                    partnersRole = guildDoc.parcerias.partnersRole
                                    pingRole = guildDoc.parcerias.pingRole

                                    if(partnersChannel) {
                                        partnersChannel = await this.client.channels.fetch(partnersChannel)
                                    } else {
                                        partnersChannel = "\`Não configurado\`"
                                    }
                
                                    if(staffRoles.length > 0) {
                                        let roles: Array<Role> = staffRoles.map((r: string) => this.client.guilds.cache.get(ctx.message?.guildId!)?.roles.cache.get(r))
                
                                        staffRoles = roles.join(` `)
                                    } else {
                                        staffRoles = "\`Não configurado\`"
                                    }
                
                                    if(partnersRole) {
                                        let role = ctx.message?.guild?.roles.cache.get(partnersRole)
                
                                        partnersRole = role
                                    } else {
                                        partnersRole = "\`Não configurado\`"
                                    }
                
                                    if(pingRole) {
                                        let role = ctx.message?.guild?.roles.cache.get(pingRole)
                
                                        pingRole = role
                                    } else {
                                        pingRole = "\`Não configurado\`"
                                    }

                                    i?.followUp(
                                        {
                                            content: `(${this.client._emojis.certo}) Cargo ${role} configurado com sucesso.`,
                                            ephemeral: true
                                        }
                                    )

                                    iMessage.delete()
                                    i1.delete()

                                    await msg.edit(
                                        {
                                            embeds: [
                                                new EmbedBuilder()
                                                .setColor("#2a2d31")
                                                .setDescription(`**Olá ${ctx.message?.author}! Segue as intruções abaixo para configures o sistema de parcerias.**\n\n>>> <:tom5_icons_channel:1013544410677530786> - Canal de parcerias: ${partnersChannel}\n<:tom5_icons_store:1013545540950184047> - Cargos staffs responsáveis: ${staffRoles}\n<:tom5_icons_partner:1013546823857746001> - Cargo parceiros: ${partnersRole}\n<:tom5_icons_timer:1023251410776768572> - Ping (Nova parceria): ${pingRole}`)
                                            ]
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