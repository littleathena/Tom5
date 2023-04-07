import { ApplicationCommandOption } from "discord.js";

export default interface CommandOptions {
    name: string,
    description: string,
    aliases?: Array<string>
    type?: number,
    options?: Array<ApplicationCommandOption>
}