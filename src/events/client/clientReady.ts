import Event from "../../classes/Event";
import Tom5 from "../../classes/Tom5";

export class Evento extends Event<"ready"> {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "ready",
                once: true,
            }
        )
        this.client = client
        this.execute = async () => {
            console.log("Client Ligado")
        }
    }
}