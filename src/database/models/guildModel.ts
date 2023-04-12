import { model, Schema } from "mongoose";

const schema = new Schema(
    {
        _id: {
            type: String,
            required: true
        }
    }
)

export default model("guilds", schema)