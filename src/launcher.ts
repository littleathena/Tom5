import Tom5 from "./classes/Tom5";
import dotenv from "dotenv"
dotenv.config()

export const client: Tom5 = await new Tom5().init()