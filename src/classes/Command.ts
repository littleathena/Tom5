import { ApplicationCommandOption, PermissionFlags } from "discord.js";
import CommandOptions from "../interfaces/commandOptions";
import ExecuteOptions from "../interfaces/executeOptions";

export default class Command implements CommandOptions {
    
    name: string;
    description: string;
    usage: string;
    type: any;
    aliases: string[] | undefined;
    options: ApplicationCommandOption[] | undefined;
    devOnly: boolean | undefined;
    userPermissions?: Array<keyof PermissionFlags>;
    botPermissions?: Array<keyof PermissionFlags>;
    execute: (options: ExecuteOptions) => any;
    
    constructor(cmdOptions: CommandOptions)  {
        this.name = cmdOptions.name,
        this.description = cmdOptions.description,
        this.usage = cmdOptions.usage,
        this.aliases = cmdOptions.aliases,
        this.type = cmdOptions.type,
        this.options = cmdOptions.options,
        this.devOnly = cmdOptions.devOnly,
        this.userPermissions = cmdOptions.userPermissions,
        this.botPermissions = cmdOptions.botPermissions
        this.execute = (options: ExecuteOptions) => {}
    }
}