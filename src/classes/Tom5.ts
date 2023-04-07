import { Client, GatewayIntentBits, Options, ActivityType
 } from "discord.js";
import { LoggerOptions, createLogger as createWinstonLogger } from "winston";

export default class Tom5 extends Client {

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
                    GatewayIntentBits.DirectMessageReactions,
                    GatewayIntentBits.DirectMessageTyping,
                    GatewayIntentBits.DirectMessages,
                    GatewayIntentBits.GuildBans,
                    GatewayIntentBits.GuildEmojisAndStickers,
                    GatewayIntentBits.GuildIntegrations,
                    GatewayIntentBits.GuildInvites,
                    GatewayIntentBits.GuildMembers,
                    GatewayIntentBits.GuildMessageReactions,
                    GatewayIntentBits.GuildMessageTyping,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.GuildScheduledEvents,
                    GatewayIntentBits.GuildVoiceStates,
                    GatewayIntentBits.GuildWebhooks,
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.MessageContent,
                ],
                presence: {
                    status: process.env.enviroment === "dev" ? "idle" : "online",
                    activities: [
                        {
                            name: "⟨ /help ⟩ - Ask for help!",
                            type: ActivityType.Watching
                        }
                    ]
                }
            }
        )
    }

    async init(): Promise<void> {

        await this.login(process.env.DISCORD_TOKEN)
    }
}