import Tom5 from "../classes/Tom5";
import CommandContext from "../managers/commandContext";

export default interface ExecuteOptions {
    ctx: CommandContext
    client: Tom5
}