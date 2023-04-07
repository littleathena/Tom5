import ExecuteOptions from "../interfaces/executeOptions"
import { Awaitable } from "discord.js"

export type CommandType = {
    execute: (options: ExecuteOptions) => Awaitable<any>
}