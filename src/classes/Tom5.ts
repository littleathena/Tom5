import { Client, GatewayIntentBits, Options, ActivityType, Collection, Partials, GlobalSweepFilter, User} from "discord.js";
import CommandsManager from "../managers/commandsManager";
import EventsManager from "../managers/eventsManager";
import chalk from "chalk"
import DatabaseManager from "../managers/databaseManager";
import guildModel from "../database/models/guildModel";
import userModel from "../database/models/userModel";
import DatabaseMethods from "./Database";

export default class Tom5 extends Client {
    
    public utils: { 
        commands: {
            prefix: Collection<string, object>;
            slash: Collection<string, object>;
        };
        events: Collection<string, object>;
        aliases: Collection<string, object>;
    };
    public managers!: {
        commandsManager: CommandsManager;
        databaseManager: DatabaseManager;
        eventsManager: EventsManager;
    };
    public db!: DatabaseMethods
    public _emojis: { 
        certo: string; 
        errado: string; 
        load: string; 
    };
    public devs: string[];
    public prefix: string;

    constructor() {
        super(
            {
                makeCache: Options.cacheWithLimits(
                    {
                        ApplicationCommandManager: Infinity,
                        BaseGuildEmojiManager: 0,
                        GuildMemberManager: Infinity,
                        GuildStickerManager: 0,
                        GuildScheduledEventManager: 0,
                        MessageManager: Infinity,
                        StageInstanceManager: 0,
                        ThreadManager: 0,
                        ThreadMemberManager: 0,
                        UserManager: Infinity,
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
                partials: [
                    Partials.Channel,
                    Partials.Message
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
            commands: {
                prefix: new Collection<string, object>(),
                slash: new Collection<string, object>()
            },
            events: new Collection<string, object>(),
            aliases: new Collection<string, object>()
        },
        this.managers = {
            commandsManager: new CommandsManager(this),
            databaseManager: new DatabaseManager(this),
            eventsManager: new EventsManager(this)
        },
        this.db = new DatabaseMethods()
        this._emojis = {
            "certo": "<:tom5_icons_Correct:1013543813647704105>",
            "errado": "<:tom5_icons_Wrong:1013544051611533373>",
            "load": "<a:load:1036030535060967476>"
        },
        this.devs = ["541030181616222218"],
        this.prefix = "t."
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
        await this.managers.databaseManager.config()
        await this.managers.eventsManager.loadEvents()
    }
}