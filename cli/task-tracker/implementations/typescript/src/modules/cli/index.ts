import * as process from "node:process";
import {Tasks} from "../task/Tasks.js";


export class CLI{

    private tasks: Tasks = new Tasks();

    public readonly commands: CommandRegistry = {
        add: {
            usage: "add <description>",
            description: "Add a new task",
            run: (args) => {
                if(args.length > 1 || args.length === 0){
                    console.warn("Invalid arguments for 'add' command.");
                    this.printHelp();
                    process.exit(1);
                }
                this.tasks.addTask(args[0]!);
            }
        },
        list: {
            usage: "list [status]",
            description: "List all tasks, optionally filtered by status",
            run: (args) => {
                this.tasks.listTasks();
            }
        },
        "--help": {
            usage: "--help",
            description: "Display usage information",
            run: (args) => {
                this.printHelp()
            }
        }
    }

    static start(args: string[]){
        const cli = new CLI();
        cli.run(args);

    }

    private run(args: string[]){
        const [ command, ...restArgs ] = args;

        if (!command) {
            this.printHelp();
            process.exit(1);
        }

        const def = this.commands[command];

        if(!def){
            console.warn(`Unknown command: ${command}`);
            this.printHelp();
            process.exit(1);
        }

        def.run(restArgs, { rawArgs: args });
    }

    private printHelp(){
        console.info("Usage:");
        for(const [name, def] of Object.entries(this.commands)){
            console.info(`  ${def.usage.padEnd(22)} ${def.description}`);
        }

    }



}