import Tom5 from "../classes/Tom5";
import { CommandInteraction, InteractionReplyOptions } from "discord.js"
import { Player } from "../libs/vulkava";

export default class CommandContext {

    public client!: Tom5;
    public interaction!: CommandInteraction;

    constructor(
        client: Tom5,
        interaction: CommandInteraction,
    ) {
        this.client = client
        this.interaction = interaction
    }

    public async reply(
        options: CommandInteraction
    ) : Promise<unknown> {

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

    // public get player(): Player {

    // }
}