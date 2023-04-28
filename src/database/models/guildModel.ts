import { model, Schema } from "mongoose";

const schema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        parcerias: {
            canal: {
                type: String,
                default: null
            },
            staffRoles: {
                type: Array,
                default: null
            },
            partnersRole: {
                type: String,
                default: null
            }
        }
    }
)

export default model("guilds", schema)