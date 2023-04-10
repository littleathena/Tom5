import chalk from "chalk";
import Tom5 from "./classes/Tom5";
import * as dotenv from "dotenv"
dotenv.config()

process.on('unhandledRejection', (reason, p) => {
    console.log(
        chalk.bold.red(
            "[SCRIPT REJEITADO]\n"
        ),
        reason
    )
});

process.on("uncaughtException", (err, origin) => {
    console.log(
        chalk.bold.red(
            "[ERRO CAPTURADO]\n"
        ),
        err
    )
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(
        chalk.bold.red(
            "[SCRIPT BLOQUEADO]\n"
        ),
        err
    )
});

export const client: Tom5 = await new Tom5().init()