import { ApplicationCommandOption, Awaitable, PermissionFlags } from "discord.js";
import CommandOptions from "../interfaces/commandOptions";
import ExecuteOptions from "../interfaces/executeOptions";

export default class Command implements CommandOptions {
    
    name!: string;
    description!: string;
    type!: any;
    options?: ApplicationCommandOption[] | undefined;
    devOnly?: boolean | undefined;
    userPermissions?:Array<keyof PermissionFlags> | undefined;
    botPermissions?: Array<keyof PermissionFlags> | undefined;
    execute!: (options: ExecuteOptions) => Awaitable<any>;
    
    constructor(cmdOptions: CommandOptions)  {
        this.name = cmdOptions.name,
        this.description = cmdOptions.description,
        this.type = cmdOptions.type,
        this.options = cmdOptions.options
        this.devOnly = cmdOptions?.devOnly,
        this.userPermissions = cmdOptions?.userPermissions,
        this.botPermissions = cmdOptions?.botPermissions,
        this.execute = (options: ExecuteOptions) => {}
    }
}