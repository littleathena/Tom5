import { AutoModerationActionType, AutoModerationRuleEventType, AutoModerationRuleTriggerType } from "discord.js";
import Event from "../../classes/Event";
import Tom5 from "../../classes/Tom5";

export class Evento extends Event<"messageCreate"> {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "messageCreate",
                once: false
            }
        )
        this.client = client
        this.execute = async (message) => {

            // const guild = this.client.guilds.cache.get("1093949355158929510")

            // await guild?.autoModerationRules.create(
            //     {
            //         name: "Anti Spam",
            //         actions: [
            //             {
            //                 type: AutoModerationActionType.BlockMessage,
            //                 metadata: {
            //                     channel: "1096377375970832384",
            //                     customMessage: "A sua mensagem não pode enviada por suspeita de **SPAM**"
            //                 }
            //             }
            //         ],
            //         eventType: AutoModerationRuleEventType.MessageSend,
            //         triggerType: AutoModerationRuleTriggerType.Spam,
            //     }
            // )

            // console.log(guild?.autoModerationRules)
        }
    }
}