import { ApplicationCommandOption, Awaitable } from "discord.js";
import CommandOptions from "../interfaces/commandOptions";
import DeveloperOptions from "../interfaces/developerOptions";
import ExecuteOptions from "../interfaces/executeOptions";

export default class Command implements CommandOptions, DeveloperOptions {
    
    name!: string;
    description!: string;
    aliases?: string[] | undefined;
    type?: number | undefined;
    options?: ApplicationCommandOption[] | undefined;
    devOnly?: boolean | undefined;
    userPermissions?: string[] | undefined;
    botPermissions?: string[] | undefined;
    execute!: (options: ExecuteOptions) => Awaitable<any>;
    
    constructor(cmdOptions: CommandOptions, devOptions: DeveloperOptions)  {
        this.name = cmdOptions.name,
        this.description = cmdOptions.description,
        this.aliases = cmdOptions.aliases,
        this.type = cmdOptions.type,
        this.options = cmdOptions.options
        this.devOnly = devOptions.devOnly,
        this.userPermissions = devOptions.userPermissions,
        this.botPermissions = devOptions.botPermissions,
        this.execute = () => {}
    }
}