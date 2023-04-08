import { Awaitable, ClientEvents } from "discord.js";
import EventOptions from "../interfaces/eventOptions";

export default class Event<Key extends keyof ClientEvents> implements EventOptions {

    public name!: Key | string;
    public once!: boolean;
    public execute!: (...args: ClientEvents[Key]) => any;
    
    constructor(options: EventOptions) {
        this.name = options.name,
        this.once = options.once
        this.execute = () => {}
    }
}