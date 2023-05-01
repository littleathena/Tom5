import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, DMChannel, EmbedBuilder, ModalActionRowComponentBuilder, ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import Event from "../../classes/Event";
import Tom5 from "../../classes/Tom5";
import { StatusParceriaBot } from "../../enums/parceriasBotStatusEnum";

export class Evento extends Event<"interactionCreate"> {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "interactionCreate",
                once: false
            }
        )
        this.client = client
        this.execute = async (interaction) => {

            if(!interaction.isButton()) return

            if(interaction.customId !== "criar_parceria_bot") return

            var resultString = `>>> **(${this.client._emojis.load}) Tipo de Parceria:** \`Por responder\`\n**(${this.client._emojis.load}) Descrição:** \`Por responder\`\n**(${this.client._emojis.load}) Vantagens (Para si e para nós, Equipe Tom5 e Tom5):** \`Por responder\`\n**(${this.client._emojis.load}) Link:** \`Por responder\``

            const i1 = await interaction.update(
                {
                    content: resultString,
                    embeds: [
                        new EmbedBuilder()
                        .setColor("#2a2d31")
                        .setDescription(`**(${this.client._emojis.load}) Seleciona o tipo de parceria...**`)
                    ],
                    components: [
                        new ActionRowBuilder<StringSelectMenuBuilder>()
                        .addComponents(
                            new StringSelectMenuBuilder()
                            .setCustomId("menu_parceria_per1")
                            .setPlaceholder("Selecionar Tipo")
                            .setOptions(
                                [
                                    {
                                        label: "Servidor",
                                        value: "servidor",
                                        description: "Parceria com servidor"
                                    },
                                    {
                                        label: "Bot",
                                        value: "bot",
                                        description: "Parceria com um bot"
                                    }
                                ]
                            )
                        )
                    ]
                }
            )

            var r1: string, r2: string, r3: string, r4: string;

            const col1 = i1.createMessageComponentCollector(
                {
                    componentType: ComponentType.StringSelect,
                    time: 60 * 1000,
                    filter: (u) => u.user.id === interaction.user.id
                }
            ).on("collect", async (resp1) => {

                resp1.deferUpdate()

                const value = resp1.values[0]

                switch(value) {
                    case "servidor": {
                        r1 = "Servidor"

                        resultString = `>>> **(${this.client._emojis.certo}) Tipo de Parceria:** \`${r1}\`\n**(${this.client._emojis.load}) Descrição:** \`Por responder\`\n**(${this.client._emojis.load}) Vantagens (Para si e para nós, Equipe Tom5 e Tom5):** \`Por responder\`\n**(${this.client._emojis.load}) Link:** \`Por responder\``

                        break
                    }

                    case "bot": {
                        r1 = "Bot"

                        resultString = `>>> **(${this.client._emojis.certo}) Tipo de Parceria:** \`${r1}\`\n**(${this.client._emojis.load}) Descrição:** \`Por responder\`\n**(${this.client._emojis.load}) Vantagens (Para si e para nós, Equipe Tom5 e Tom5):** \`Por responder\`\n**(${this.client._emojis.load}) Link:** \`Por responder\``

                        break
                    }
                }

                col1.stop()

                const i2 = await interaction.editReply(
                    {
                        content: resultString,
                        embeds: [
                            new EmbedBuilder()
                            .setColor("#2a2d31")
                            .setDescription(`**(${this.client._emojis.load}) Escreva uma descrição para a sua parceria (Max: \`500 caractéres & 5 min\`)**`)
                        ],
                        components: [
                            new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                new ButtonBuilder()
                                .setCustomId("btn_desc")
                                .setLabel("Escrever")
                                .setStyle(ButtonStyle.Secondary)
                            )
                        ]
                    }
                )

                const col2 = i2.createMessageComponentCollector(
                    {
                        componentType: ComponentType.Button,
                        filter: (u) => u.user.id === interaction.user.id,
                        time: 5 * 60 * 1000
                    }
                ).on("collect", async (resp2_1) => {

                    if(resp2_1.customId !== "btn_desc") return

                    const modalDescrição = new ModalBuilder()
                    .setCustomId("modal_parcerias_bot_desc")
                    .setTitle("Criar Parceria")
                    .addComponents(
                        new ActionRowBuilder<ModalActionRowComponentBuilder>()
                        .addComponents(
                            new TextInputBuilder()
                            .setCustomId("descricao")
                            .setLabel("Escreve uma descrição para a tua parceria")
                            .setMaxLength(500)
                            .setMinLength(0)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Paragraph)
                        ),
                    )

                    col2.stop()

                    resp2_1.showModal(modalDescrição)

                    resp2_1.awaitModalSubmit(
                        {
                            time: 5 * 60 * 1000
                        }
                    ).then(async (resp2) => {

                        resp2.deferUpdate()
    
                        r2 = resp2.fields.getTextInputValue("descricao")
    
                        resultString = `>>> **(${this.client._emojis.certo}) Tipo de Parceria:** \`${r1}\`\n**(${this.client._emojis.certo}) Descrição:** \n${r2}\n\n**(${this.client._emojis.load}) Vantagens (Para si e para nós, Equipe Tom5 e Tom5):** \`Por responder\`\n**(${this.client._emojis.load}) Link:** \`Por responder\``
    
                        const i3 = await interaction.editReply(
                            {
                                content: resultString,
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor("#2a2d31")
                                    .setDescription(`**(${this.client._emojis.load}) Escreve algumas vantagens e/ou motivos para esta parceria ser realizada... (Max: \`500 caractéres & 5 min\`)**`)
                                ],
                                components: [
                                    new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        new ButtonBuilder()
                                        .setCustomId("btn_vanta")
                                        .setLabel("Escrever")
                                        .setStyle(ButtonStyle.Secondary)
                                    )
                                ]
                            }
                        )

                        const col3 = i3.createMessageComponentCollector(
                            {
                                componentType: ComponentType.Button,
                                filter: (u) => u.user.id === interaction.user.id,
                                time: 5 * 60 * 1000
                            }
                        ).on("collect", async (resp3_1) => {

                            if(resp3_1.customId !== "btn_vanta") return

                            const modalVantagens = new ModalBuilder()
                            .setCustomId("modal_parcerias_bot")
                            .setTitle("Criar Parceria")
                            .addComponents(
                                new ActionRowBuilder<ModalActionRowComponentBuilder>()
                                .addComponents(
                                    new TextInputBuilder()
                                    .setCustomId("vantagens")
                                    .setLabel("Escreve algumas vantagens")
                                    .setMaxLength(500)
                                    .setMinLength(0)
                                    .setRequired(true)
                                    .setPlaceholder("Obs: As vantagens devem ser aplicáveis a todos (tanto a você como a nós)")
                                    .setStyle(TextInputStyle.Paragraph)
                                ),
                            )

                            col3.stop()
        
                            resp3_1.showModal(modalVantagens)
        
                            resp3_1.awaitModalSubmit(
                                {
                                    time: 5 * 60 * 1000
                                }
                            ).then(async (resp3) => {

                                resp3.deferUpdate()
        
                                r3 = resp3.fields.getTextInputValue("vantagens")
        
                                resultString = `>>> **(${this.client._emojis.certo}) Tipo de Parceria:** \`${r1}\`\n**(${this.client._emojis.certo}) Descrição:**\n${r2}\n\n**(${this.client._emojis.certo}) Vantagens (Para si e para nós, Equipe Tom5 e Tom5):**\n${r3}\n\n**(${this.client._emojis.load}) Link:** \`Por responder\``
        
                                const i4 = await interaction.editReply(
                                    {
                                        content: resultString,
                                        embeds: [
                                            new EmbedBuilder()
                                            .setColor("#2a2d31")
                                            .setDescription(`**(${this.client._emojis.load}) Indique o url do seu ${r1.toLowerCase()}...**`)
                                        ],
                                        components: [
                                            new ActionRowBuilder<ButtonBuilder>()
                                            .addComponents(
                                                new ButtonBuilder()
                                                .setCustomId("btn_link")
                                                .setLabel("Escrever")
                                                .setStyle(ButtonStyle.Secondary)
                                            )
                                        ]
                                    }
                                )

                                const col4 = i4.createMessageComponentCollector(
                                    {
                                        componentType: ComponentType.Button,
                                        filter: (u) => u.user.id === interaction.user.id,
                                        time: 5 * 60 * 1000
                                    }
                                ).on("collect", async (resp4_1) => {

                                    if(resp4_1.customId !== "btn_link") return

                                    const modalLink = new ModalBuilder()
                                    .setCustomId("modal_parcerias_bot")
                                    .setTitle("Criar Parceria")
                                    .addComponents(
                                        new ActionRowBuilder<ModalActionRowComponentBuilder>()
                                        .addComponents(
                                            new TextInputBuilder()
                                            .setCustomId("link")
                                            .setLabel(`Indica o link do teu ${r1.toLowerCase()}`)
                                            .setRequired(true)
                                            .setStyle(TextInputStyle.Paragraph)
                                        ),
                                    )

                                    col4.stop()
                
                                    resp4_1.showModal(modalLink)

                                    resp4_1.awaitModalSubmit(
                                        {
                                            time: 5 * 60 * 1000
                                        }
                                    ).then(async (resp4) => {

                                        resp4.deferUpdate()
        
                                        r4 = resp4.fields.getTextInputValue("link")
                
                                        resultString = `>>> **(${this.client._emojis.certo}) Tipo de Parceria:** \`${r1}\`\n**(${this.client._emojis.certo}) Descrição:**\n${r2}\n\n**(${this.client._emojis.certo}) Vantagens (Para si e para nós, Equipe Tom5 e Tom5):**\n${r3}\n\n**(${this.client._emojis.certo}) Link:** \n${r4}`

                                        await interaction.editReply(
                                            {
                                                content: resultString,
                                                embeds: [
                                                    new EmbedBuilder()
                                                    .setColor("#2a2d31")
                                                    .setDescription(`**(${this.client._emojis.load}) A terminar o seu pedido**`)
                                                ],
                                                components: []
                                            }
                                        )

                                        const wait = new Promise(resolve => {

                                            const channel = this.client.channels.cache.get("1102567606944280656")
                                            if(!channel?.isTextBased()) return

                                            const cargoStaffsParcerias = this.client.guilds.cache.get("1093949355158929510")?.roles.cache.get("1096183560337109193")!

                                            channel.send(
                                                {
                                                    content: `${cargoStaffsParcerias}`,
                                                    embeds: [
                                                        new EmbedBuilder()
                                                        .setColor("#2a2d31")
                                                        .setTitle(`Novo pedido de parceria`)
                                                        .addFields(
                                                            {
                                                                name: "Usuário",
                                                                value: `${interaction.user} - \`${interaction.user.tag} | ${interaction.user.id}\``,
                                                                inline: false
                                                            },
                                                            {
                                                                name: "Tipo",
                                                                value: r1,
                                                                inline: false
                                                            },
                                                            {
                                                                name: "Descrição",
                                                                value: r2,
                                                                inline: false
                                                            },
                                                            {
                                                                name: "Vantagens",
                                                                value: r3
                                                            },
                                                            {
                                                                name: "Link",
                                                                value: r4
                                                            }
                                                        )
                                                    ],
                                                    components: [
                                                        new ActionRowBuilder<StringSelectMenuBuilder>()
                                                        .addComponents(
                                                            new StringSelectMenuBuilder()
                                                            .setCustomId(`menu_options_parcerias_${interaction.user.id}`)
                                                            .setPlaceholder("Selecionar Ação")
                                                            .setOptions(
                                                                [
                                                                    {
                                                                        label: "Aceitar",
                                                                        value: "sim",
                                                                    },
                                                                    {
                                                                        label: "Negar",
                                                                        value: "nao",
                                                                    }
                                                                ]
                                                            )
                                                        )
                                                    ]
                                                }
                                            )

                                            setTimeout(resolve, 5000)
                                        })

                                        await wait

                                        await interaction.editReply(
                                            {
                                                content: "",
                                                embeds: [
                                                    new EmbedBuilder()
                                                    .setColor("#2a2d31")
                                                    .setDescription(`**(${this.client._emojis.certo}) O seu pedido de parceria foi enviado para a nossa equipa**`)
                                                ]
                                            }
                                        )

                                        await interaction.channel?.send(`**Resumo das suas respostas**\n\n${resultString}`)

                                        const model = {
                                            userId: interaction.user.id,
                                            type: r1.toLowerCase(),
                                            desc: r2,
                                            vantagens: r3,
                                            link: r4,
                                            status: StatusParceriaBot.Avaliação,
                                            date: Date.now()
                                        }

                                        const update = await this.client.db.updateOne(
                                            "clients",
                                            {
                                                _id: this.client.user?.id
                                            },
                                            {
                                                $push: {
                                                    parcerias: model
                                                }
                                            }
                                        )
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    }
}