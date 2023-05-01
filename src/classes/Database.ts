import clientModel from "../database/models/clientModel"
import guildModel from "../database/models/guildModel"
import userModel from "../database/models/userModel"
export default class DatabaseMethods {

    constructor() {}

    async getOne(modelType: "clients" | "guilds" | "users", filter: object): Promise<any> {

        let res = {
            clients: await clientModel.findOne(filter),
            guilds: await guildModel.findOne(filter),
            users: await userModel.findOne(filter)
        }

        if(!res.clients && modelType === "clients") {
            res.clients = await new clientModel(filter).save()
        }

        if(!res.guilds && modelType === "guilds")  {
            res.guilds = await new guildModel(filter).save()
        }

        if(!res.users && modelType === "users") {
            res.users = await new userModel(filter).save()
        }

        return res[modelType]
    }

    async getMany(modelType: "guilds" | "users" , filter: object, limit: number | null): Promise<any> {

        let res = {
            users: userModel.find(filter),
            guilds: guildModel.find(filter)
        }

        if(limit) {
            res = {
                users: res.users.limit(limit),
                guilds: res.guilds.limit(limit)
            }
        }

        return res[modelType]
    }

    async updateOne(modelType: "clients" | "guilds" | "users", filter: object, newSchema: object): Promise<any> {

        let res = {
            clients: await clientModel.findOneAndUpdate(
                filter,
                newSchema
            ),
            guilds: await guildModel.findOneAndUpdate(
                filter,
                newSchema
            ),
            users: await userModel.findOneAndUpdate(
                filter,
                newSchema
            )
        }

        if(!res.clients && modelType === "clients") {
            let newModel: any = await new clientModel(filter).save()
            newModel = newModel.updateOne(newSchema)

            res.clients = newModel
        }

        if(!res.guilds && modelType === "guilds")  {
            let newModel: any = await new guildModel(filter).save()
            newModel = newModel.updateOne(newSchema)

            res.guilds = newModel
        }

        if(!res.users && modelType === "users") {
            let newModel: any = await new userModel(filter).save()
            newModel = newModel.updateOne(newSchema)

            res.users = newModel
        }

        return res[modelType]
    }

    async updateMany(modelType: "guilds" | "users", filter: object, newSchema: object, limit: number | null): Promise<any> {

        let res = {
            users: userModel.updateMany(
                filter,
                newSchema,
            ),
            guilds: guildModel.updateMany(
                filter,
                newSchema
            )
        }

        if(limit) {
            res = {
                users: res.users.limit(limit),
                guilds: res.guilds.limit(limit)
            }
        }

        return res[modelType]
    }

    async deleteOne(modelType: "guilds" | "users", filter: object): Promise<any> {

        let res = {
            users: await userModel.deleteOne(filter),
            guilds: await guildModel.deleteOne(filter)
        }

        return res[modelType]
    }

    async deleteMany(modelType: "guilds" | "users", filter: object, limit: number | null): Promise<any> {

        let res = {
            users: userModel.deleteMany(filter),
            guilds: guildModel.deleteMany(filter)
        }

        if(limit) {
            res = {
                users: res.users.limit(limit),
                guilds: res.guilds.limit(limit)
            }
        }

        return res[modelType]
    }
}