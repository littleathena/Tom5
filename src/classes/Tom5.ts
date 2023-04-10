import { Client, GatewayIntentBits, Options, ActivityType, Collection
 } from "discord.js";
import { LoggerOptions, createLogger as createWinstonLogger } from "winston";
import CommandsManager from "../managers/commandsManager";
import EventsManager from "../managers/eventsManager";
import chalk from "chalk"

export default class Tom5 extends Client {
    
    public utils: { 
        commands: Collection<string, object>;
        events: Collection<string, object>; 
    };
    public managers!: {
        commandsManager: CommandsManager;
        eventsManager: EventsManager;
    }
    public devs: string[];
    public _emojis: { 
        certo: string; 
        errado: string; 
        load: string; 
    };

    constructor() {
        super(
            {
                makeCache: Options.cacheWithLimits(
                    {
                        ApplicationCommandManager: 0,
                        BaseGuildEmojiManager: 0,
                        GuildMemberManager: Infinity,
                        GuildStickerManager: 0,
                        GuildScheduledEventManager: 0,
                        MessageManager: 0,
                        StageInstanceManager: 0,
                        ThreadManager: 0,
                        ThreadMemberManager: 0,
                        UserManager: 0
                    }
                ),
                intents: [
                    GatewayIntentBits.AutoModerationConfiguration,
                    GatewayIntentBits.AutoModerationExecution,
                    GatewayIntentBits.DirectMessageReactions,
                    GatewayIntentBits.DirectMessageTyping,
                    GatewayIntentBits.DirectMessages,
                    GatewayIntentBits.GuildEmojisAndStickers,
                    GatewayIntentBits.GuildIntegrations,
                    GatewayIntentBits.GuildInvites,
                    GatewayIntentBits.GuildMembers,
                    GatewayIntentBits.GuildMessageReactions,
                    GatewayIntentBits.GuildMessageTyping,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.GuildModeration,
                    GatewayIntentBits.GuildPresences,
                    GatewayIntentBits.GuildScheduledEvents,
                    GatewayIntentBits.GuildVoiceStates,
                    GatewayIntentBits.GuildWebhooks,
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.MessageContent
                ],
                presence: {
                    status: process.env.ENVIROMENT == "dev" ? "idle" : "online",
                    activities: [
                        {
                            name: "⟨ /help ⟩ - Ask for help!",
                            type: ActivityType.Watching
                        }
                    ]
                }
            },
        );
        this.utils = {
            commands: new Collection<string, object>(),
            events: new Collection<string, object>()
        },
        this.managers = {
            commandsManager: new CommandsManager(this),
            eventsManager: new EventsManager(this)
        },
        this.devs = ["541030181616222218"],
        this._emojis = {
            "certo": "<:tom5_icons_Correct:1013543813647704105>",
            "errado": "<:tom5_icons_Wrong:1013544051611533373>",
            "load": "<a:load:1036030535060967476>"
        }
    }

    async init(): Promise<any> {

        await this.login(process.env.DISCORD_TOKEN)
        
        await this.loadModules()

        console.log(
            chalk.bold.green(
                "[CLIENT]"
            ),
            "Conectado"
        )
    }

    async loadModules(): Promise<any> {
        await this.managers.commandsManager.loadCommands()
        await this.managers.eventsManager.loadEvents()
    }
}