#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import figlet from "figlet";
import chalk from "chalk";
console.log(chalk.yellow(figlet.textSync(`" COUNT TIMER "`)));
const res = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: chalk.cyan("\n\n\n\n\t\tPlease Enter the Amount of Second: "),
    validate: (input) => {
        if (isNaN(input)) {
            return chalk.red("\nPlease Enter Valid Value Number:");
        }
        else if (input > 60) {
            return chalk.gray("\nseconds must be in 60");
        }
        else {
            return true;
        }
    }
});
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    console.log(chalk.greenBright(`\txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`));
    console.log(chalk.magenta(`\txxxxxxxxxxxxxx Seconds Start Timer xxxxxxxxxxxxxx`));
    console.log(chalk.greenBright(`\txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`));
    setInterval((() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currTime);
        if (timeDiff <= 0) {
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`\t\t\t${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
