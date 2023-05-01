import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder } from "discord.js";
import Command from "../../../classes/Command";
import Tom5 from "../../../classes/Tom5";
import canvas from "canvas"

export class Comando extends Command {

    client: Tom5

    constructor(client: Tom5) {
        super(
            {
                name: "perfil",
                description: "[🪙] Veja o seu perfil",
                usage: "t.perfil [id]",
            }
        )
        this.client = client
        this.execute = async ({ ctx }) => {

            const addBreaks = (string: string, max: number): string => {

                max = max + 1
    
                for(let i = 0; i < (string.length / max); i++) {
    
                    string = string.substring(0, max * i) + `\n` + string.substring(max * i, string.length)
    
                }
    
                return string
            }

            let user = ctx.message?.mentions.members?.first() || ctx.message?.guild?.members.cache.get(ctx.args![0]) || ctx.message?.member!

            let Canva = canvas.createCanvas(850, 1200)
            let ctxCanva = Canva.getContext("2d")

            const backgroundProfile = await canvas.loadImage("./src/assets/images/default_background_profile.png")
            ctxCanva.drawImage(backgroundProfile, 0, 0)

            const username = user.user.tag
            ctxCanva.textAlign = "left"
            ctxCanva.font = '65px "Franklin Gothic"'
            ctxCanva.fillStyle = "#fff"
            ctxCanva.fillText(username, 310, 390, 470)

            const xp = await this.client.db.getOne(
                "users",
                {
                    _id: user.id
                }
            ).then(doc => doc.xp) || 0
            ctxCanva.textAlign = "left"
            ctxCanva.font = '65px "Franklin Gothic"'
            ctxCanva.fillStyle = "#fff"
            ctxCanva.fillText(`XP: ${xp}`, 90, 530)

            const carteira = await this.client.db.getOne(
                "users",
                {
                    _id: user.id
                }
            ).then(doc => doc.economia.wallet) || 0
            ctxCanva.textAlign = "left"
            ctxCanva.font = '65px "Franklin Gothic"'
            ctxCanva.fillStyle = "#fff"
            ctxCanva.fillText(`Carteira: ${carteira}`, 85, 530 + 65)

            const banco = await this.client.db.getOne(
                "users",
                {
                    _id: user.id
                }
            ).then(doc => doc.economia.bank) || 0
            ctxCanva.textAlign = "left"
            ctxCanva.font = '65px "Franklin Gothic"'
            ctxCanva.fillStyle = "#fff"
            ctxCanva.fillText(`Banco: ${banco}`, 85, 530 + 65 + 65)

            const aboutMe = await this.client.db.getOne(
                "users",
                {
                    _id: user.id
                }
            ).then(doc => doc.aboutMe) || "Defina o seu sobre mim usando /perfil set aboutme (Brevemente)"
            ctxCanva.textAlign = "left"
            ctxCanva.font = '65px "Franklin Gothic"'
            ctxCanva.fillStyle = "#fff"
            ctxCanva.fillText(`Sobre Mim`, 85, 800)
            ctxCanva.font = `50px "Franklin Gothic"`
            ctxCanva.fillStyle = "#7f7f7f"
            ctxCanva.fillText(addBreaks(aboutMe, 27), 110, 800 + 30)

            const userAvatar = await canvas.loadImage(user.displayAvatarURL({ extension: "png", forceStatic: true, size: 4096 }))
            ctxCanva.arc(60 + 10 + 115, 175 + 10 + 115, 115, 0, Math.PI * 2)
            ctxCanva.lineWidth = 2
            ctxCanva.strokeStyle = "#464748"
            ctxCanva.stroke()
            ctxCanva.closePath()
            ctxCanva.clip()
            ctxCanva.drawImage(userAvatar, 60, 175, 250, 250)

            ctx.interaction?.reply(
                {
                    files: [
                        new AttachmentBuilder(
                            Canva.toBuffer(), 
                            { 
                                name: `profile_${user.user.username}.png`,
                                description: `Perfil de ${user.user.tag}`
                            }
                        )
                    ]
                }
            )
        }
    }
}