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
                if(args.length > 1){
                    console.warn("Invalid arguments for 'list' command.");
                    this.printHelp();
                    process.exit(1);
                }
                this.tasks.listTasks(args[0] as TaskStatus);
            }
        },
        update: {
            usage: "update <id> <description>",
            description: "Update a task's description by ID",
            run: (args) => {
                if(args.length !== 2){
                    console.warn("Invalid arguments for 'update' command.");
                    this.printHelp();
                    process.exit(1);
                }
                this.tasks.updateTask(Number(args[0]), args[1]!);
            },
        },
        delete: {
            usage: "delete <id>",
            description: "Delete a task by ID",
            run: (args) => {
                if(args.length !== 1){
                    console.warn("Invalid arguments for 'delete' command.");
                    this.printHelp();
                    process.exit(1);
                }
                this.tasks.deleteTask(Number(args[0]));
            }
        },
        "mark-in-progress": {
            usage: "mark-in-progress <id>",
            description: "Mark a task as in-progress by ID",
            run: (args) => {
                if(args.length !== 1){
                    console.warn("Invalid arguments for 'mark-in-progress' command.");
                    this.printHelp();
                    process.exit(1);
                }
                this.tasks.markInProgress(Number(args[0]));
            }
        },
        "mark-done": {
            usage: "mark-done <id>",
            description: "Mark a task as done by ID",
            run: (args) => {
                if(args.length !== 1){
                    console.warn("Invalid arguments for 'mark-done' command.");
                    this.printHelp();
                    process.exit(1);
                }
                this.tasks.markDone(Number(args[0]));
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