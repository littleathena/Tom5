import { model, Schema } from "mongoose"

const schema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        blacklist: {
            type: Array,
            default: null
        },
        parcerias: {
            type: Array,
            default: null
        }
    }
)

export default model("clients", schema)