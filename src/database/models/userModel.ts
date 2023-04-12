import { model, Schema } from "mongoose";

const schema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        economia: {
            wallet: {
                type: Number
            },
            bank: {
                type: Number
            },
            transactions: {
                type: Array
            },
            daily: {
                lastClaim: {
                    type: Number
                },
                nextClaim: {
                    type: Number
                }
            }
        }
    }
)

export default model("users", schema)