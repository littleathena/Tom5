import { ActionRowBuilder, ComponentType, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, userMention } from "discord.js";
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
        )
        this.client = client
        this.execute = async (interaction) => {

            if(!interaction.isButton()) return

            if(interaction.customId !== "criar_parceria") return

            const modal = new ModalBuilder()
            .setCustomId("modal_parcerias")
            .setTitle("Criar Parceria")
            .addComponents(
                new ActionRowBuilder<ModalActionRowComponentBuilder>()
                .addComponents(
                    new TextInputBuilder()
                    .setCustomId("userId")
                    .setLabel("ID do usuário")
                    .setMaxLength(19)
                    .setMinLength(18)
                    .setRequired(true)
                    .setPlaceholder("Indica o ID do usuário")
                    .setStyle(TextInputStyle.Short)
                ),

                new ActionRowBuilder<ModalActionRowComponentBuilder>()
                .addComponents(
                    new TextInputBuilder()
                    .setCustomId("textoParceria")
                    .setLabel("Texto a ser exibido na mensagem")
                    .setMaxLength(3000)
                    .setRequired(true)
                    .setPlaceholder("Escreva o texto a ser exibido na mensagem da parceria")
                    .setStyle(TextInputStyle.Paragraph)
                )
            )

            const guildDoc = await this.client.db.getOne(
                "guilds",
                {
                    _id: interaction.guild?.id
                }
            )

            var canalParcerias = interaction.guild?.channels.cache.get(guildDoc.parcerias.canal)
            var staffRoles = guildDoc.parcerias.staffRoles
            var roleParceiros = interaction.guild?.roles.cache.get(guildDoc.parcerias.partnersRole)
            var pingRole = interaction.guild?.roles.cache.get(guildDoc.parcerias.pingRole)
            var parceiros = guildDoc.parcerias.partners

            if(
                !canalParcerias ||
                !staffRoles ||
                staffRoles.length < 1 ||
                !roleParceiros ||
                !pingRole
            ) {
                return interaction.reply(
                    {
                        content: `(${this.client._emojis.errado}) A configuração do sistema de parcerias não está completa.\n\n> Use o comando </config parcerias:1100883718756896770> ou \`t.config parcerias\` e acabe a configuração.`,
                        ephemeral: true
                    }
                )
            }

            const userRoles = interaction.guild?.members.cache.get(interaction.user.id)?.roles.cache.map(r => r.id)
            var res;

            for(let role of userRoles!) {
                if(staffRoles.includes(role)) {
                    res = true
                } else {
                    continue
                }
            }

            if(!res) {
                return interaction.reply(
                    {
                        content: `(${this.client._emojis.errado}) Não fazes parte da equipa de parcerias deste servidor.`,
                        ephemeral: true
                    }
                )
            }

            await interaction.showModal(modal)

            interaction.awaitModalSubmit(
                {
                    time: 256000,
                }
            ).then(async (i) => {

                if(i.customId !== "modal_parcerias") return

                const userId = i.fields.getTextInputValue("userId")
                const textoParceria = i.fields.getTextInputValue("textoParceria")

                const user = i.guild?.members.cache.get(userId)
                const staff = i.user

                if(parceiros.includes(user?.id)) {
                    return i.reply(
                        {
                            content: `(${this.client._emojis.errado}) O usuário ${user} já faz parte dos parceiros deste servidor.`,
                            ephemeral: true
                        }
                    )
                }

                if(!canalParcerias?.isTextBased()) {
                    return interaction.reply(
                        {
                            content: `(${this.client._emojis.errado}) Verifique se o canal de parcerias configurado é baseado em texto. (Canais de voz, threads, etc. não são aceitos)`,
                            ephemeral: true
                        }
                    )
                }
                
                await this.client.db.updateOne(
                    "guilds",
                    {
                        _id: i.guild?.id
                    },
                    {
                        $push: {
                            "parcerias.partners": user?.id
                        }
                    }
                )

                await canalParcerias.send(
                    {
                        content: `>>> ${textoParceria}`
                    }
                )

                await canalParcerias.send(
                    {
                        content: `**<:tom5_icons_partner:1013546823857746001> Nova Parceria!\n>>> Ping: ${pingRole}\nRepresentante: ${user}\nStaff Responsável: ${staff}**`
                    }
                )

                await user?.roles.add(roleParceiros!).catch(err => i.followUp(
                    {
                        content: `(${this.client._emojis.errado}) Erro ao dar o cargo de parceiro ao usuário ${user}`,
                        ephemeral: true
                    }
                ))

                i.reply(
                    {
                        content: `(${this.client._emojis.certo}) Parceria criada com sucesso!`,
                        ephemeral: true
                    }
                )
            })
        }
    }
}