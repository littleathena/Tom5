import { ApplicationCommandOption, PermissionFlags } from "discord.js";

export default interface CommandOptions {
    name: string,
    description: string,
    usage: string,
    aliases?: string[]
    type?: any,
    options?: Array<ApplicationCommandOption>,
    devOnly?: boolean,
    userPermissions?: Array<keyof PermissionFlags>,
    botPermissions?: Array<keyof PermissionFlags>,
    dmPerm?: boolean
}