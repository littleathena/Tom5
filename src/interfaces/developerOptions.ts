import { Permissions } from "discord.js";

export default interface DeveloperOptions {
    devOnly?: boolean,
    userPermissions?: Array<Permissions>,
    botPermissions?: Array<Permissions>
}