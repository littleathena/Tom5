import Tom5 from "../classes/Tom5";
import CommandContext from "../classes/commandContext";

export default interface ExecuteOptions {
    ctx: CommandContext
    client: Tom5
}