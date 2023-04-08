import Event from "../../classes/Event";
import Tom5 from "../../classes/Tom5";
import CommandContext from "../../managers/commandContext";

export class Evento extends Event<"interactionCreate"> {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "interactionCreate",
                once: false,
            }
        )
        this.client = client
        this.execute = async (interaction) => {

            if(!interaction.isChatInputCommand()) return
            if(!interaction.guild) return

            if(interaction.user.bot) return

            const slashCommand: any = this.client.utils.commands.get(interaction.commandName)

            if(slashCommand) {

                if(slashCommand.devOnly) {
            
                    if(!client.devs.includes(interaction.user.id)) {
                        return await interaction.reply(
                            {
                                content: `(${client._emojis.errado}) Apenas os meus desenvolvedores podem usar este comando.`
                            }
                        )
                    }
                }
            
                if(slashCommand.userPermissions) {
            
                    if(slashCommand.userPermissions.length > 0) {
            
                        let membro = interaction.member!
            
                        let permsMembro = (await interaction.guild?.members.fetch(membro.user.id))?.permissions.toArray()

                        for(let perm of slashCommand.userPermissions) {
                            if(!permsMembro?.includes(perm)) {
                                return await interaction.reply(
                                    {
                                        content: `(${client._emojis.errado}) Não tens permissão para usar este comando [\`${perm}\`].`
                                    }
                                )
                            }
                        }
                    }
                }
            
                if(slashCommand.botPermissions) {
            
                    if(slashCommand.botPermissions.length > 0) {
            
                        let permsBot = interaction.guild?.members.me?.permissions.toArray()

                        for(let perm of slashCommand.botPermissions) {
                            if(!permsBot?.includes(perm)) {
                                return await interaction.reply(
                                    {
                                        content: `(${client._emojis.errado}) Não tenho permissões suficientes para executar este comando [\`${perm}\`].`
                                    }
                                )
                            }
                        }
                    }
                }

                const ctx = new CommandContext(this.client, interaction)

                slashCommand.execute({ ctx })
            }
        }
    }
}