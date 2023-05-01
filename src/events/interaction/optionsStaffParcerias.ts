import { ActionRowBuilder, EmbedBuilder, ModalActionRowComponentBuilder, ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import Event from "../../classes/Event";
import Tom5 from "../../classes/Tom5";
import { StatusParceriaBot } from "../../enums/parceriasBotStatusEnum";
import ms from "parse-ms"

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

            if(!interaction.isStringSelectMenu()) return
            if(!interaction.customId.startsWith("menu_options_parcerias_")) return

            const value = interaction.values[0]
            let user = this.client.users.cache.get(interaction.customId.replace("menu_options_parcerias_", ""))

            switch(value) {
                case "sim": {

                    const clientDoc = await this.client.db.getOne(
                        "clients",
                        {
                            _id: this.client.user?.id
                        }
                    )

                    let parcerias = clientDoc.parcerias
                    const userParceria = parcerias.find((p: any) => p.userId === user?.id)
                    const diff = ms(Date.now() - userParceria.date)

                    user?.send(
                        {
                            embeds: [
                                new EmbedBuilder()
                                .setColor("#2a2d31")
                                .setDescription(`**(${this.client._emojis.certo}) O seu pedido de parceria foi aceite.\n\n> Demorámos cerca de \`${diff.days}d / ${diff.hours}h / ${diff.minutes
                                }m\` para analisar o seu pedido**`)
                            ]
                        }
                    )

                    await interaction.editReply(
                        {
                            content: "",
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
                                    .setDisabled(true)
                                )
                            ]
                        }
                    )

                    interaction.followUp(`**(${this.client._emojis.certo}) Parceria aceite. Staff: ${interaction.user}**`)

                    parcerias = parcerias.map((p: any) => {
                        if(p.userId === user?.id) {
                            p.status = StatusParceriaBot.Aceite
                        }

                        return p
                    })

                    await this.client.db.updateOne(
                        "clients",
                        {
                            _id: this.client.user?.id
                        },
                        {
                            $set: {
                                parcerias: parcerias
                            }
                        }
                    )

                    break
                }

                case "nao": {

                    const clientDoc = await this.client.db.getOne(
                        "clients",
                        {
                            _id: this.client.user?.id
                        }
                    )

                    const modalNegar = new ModalBuilder()
                    .setCustomId("modal_negar")
                    .setTitle("Motivo")
                    .addComponents(
                        new ActionRowBuilder<ModalActionRowComponentBuilder>()
                        .addComponents(
                            new TextInputBuilder()
                            .setCustomId("motivo")
                            .setLabel("Escreva o motivo da negação")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                        )
                    )

                    await interaction.showModal(modalNegar)

                    interaction.awaitModalSubmit(
                        {
                            time: 5 * 60 * 1000
                        }
                    ).then(async i => {

                        let parcerias: any[] = clientDoc.parcerias
                        const userParceria = parcerias.find((p: any) => p.userId === user?.id)
                        const diff = ms(Date.now() - userParceria.date)
                        const motivo = i.fields.getTextInputValue("motivo")

                        user?.send(
                            {
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor("#2a2d31")
                                    .setDescription(`**(${this.client._emojis.errado}) O seu pedido de parceria foi negado.\n\nMotivo:**\n> ${motivo}\n\n> Demorámos cerca de \`${diff.days}d / ${diff.hours}h / ${diff.minutes
                                    }m\` para analisar o seu pedido`)
                                ]
                            }
                        )

                        i.deferUpdate()

                        await interaction.editReply(
                            {
                                content: "",
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
                                        .setDisabled(true)
                                    )
                                ]
                            }
                        )

                        await interaction.followUp(`**(${this.client._emojis.certo}) Parceria negada. Staff: ${interaction.user}**`)

                        for(let p in parcerias) {
                            if(parcerias[p].userId === user?.id) {
                                parcerias = parcerias.splice(parcerias.indexOf(p), 1)
                            }
                        }

                        await this.client.db.updateOne(
                            "clients",
                            {
                                _id: this.client.user?.id
                            },
                            {
                                $set: {
                                    parcerias: parcerias
                                }
                            }
                        )
                    })

                    break
                }
            }
        }
    }
}