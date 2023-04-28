import Tom5 from "../classes/Tom5";
import { ChatInputCommandInteraction, CommandInteraction, Message } from "discord.js"

export default class CommandContext {

    public client!: Tom5;
    public interaction?: CommandInteraction;
    public message?: Message

    constructor(
        client: Tom5,
        interaction?: ChatInputCommandInteraction | undefined,
        message?: Message
    ) {
        this.client = client
        this.interaction = interaction
        this.message = message
    }
}