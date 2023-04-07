import Tom5 from "../classes/Tom5";
import { Message, ChatInputCommandInteraction, InteractionReplyOptions, MessageReplyOptions, User, Guild, GuildMember, APIInteractionGuildMember, TextChannel } from "discord.js"
import { Player } from "../libs/vulkava";

export default class CommandContext {

    public client!: Tom5;
    public interaction!: Message | ChatInputCommandInteraction;
    public args!: Array<string>

    constructor(
        client: Tom5,
        interaction: Message | ChatInputCommandInteraction,
        args: Array<string>
    ) {
        this.client = client
        this.interaction = interaction
        this.args = args
    }

    public async reply(
        options: Message | ChatInputCommandInteraction
    ) : Promise<unknown> {

        if(this.interaction instanceof ChatInputCommandInteraction) {

            if(this.interaction.replied) {
                return this.interaction.followUp(
                    Object.assign(options, { fetchReply: true }) as InteractionReplyOptions
                )
            }

            if(this.interaction.deferred) {
                return this.interaction.editReply(
                    Object.assign(options, { fetchReply: true }) as InteractionReplyOptions
                )
            }

            return this.interaction.reply(
                Object.assign(options, { fetchReply: true }) as InteractionReplyOptions
            )
        }

        if(this.interaction instanceof Message) {
            return this.interaction.reply(
                options as MessageReplyOptions
            )
        }
    }

    public get subCommand(): string | null {
        
        if(this.interaction instanceof ChatInputCommandInteraction) {
            return this.interaction.options.getSubcommand()
        }

        return null
    }

    public get user(): User {

        if(this.interaction instanceof Message) {
            return this.interaction.author
        }

        return this.interaction.user
    }

    public get guild(): Guild | null {

        return this.interaction.guild
    }

    public get guildId(): string | null {

        return this.interaction.guildId
    }

    public get member(): GuildMember | APIInteractionGuildMember | null {

        return this.interaction.member
    }

    public get channel(): TextChannel {

        return this.interaction.channel as TextChannel
    }

    // public get player(): Player {
    //     return {}
    // }
}