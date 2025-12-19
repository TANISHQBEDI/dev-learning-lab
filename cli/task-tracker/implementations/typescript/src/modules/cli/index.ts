import * as process from "node:process";


export class CLI{

    public static readonly commands: CommandRegistry = {
        add: {
            usage: "add <description>",
            description: "Add a new task",
            run: (args) => {
                console.info("Adding a new task...");
            }
        },
        list: {
            usage: "list [status]",
            description: "List all tasks, optionally filtered by status",
            run: (args) => {
                console.info("Listing all tasks...");
            }
        },
        "--help": {
            usage: "--help",
            description: "Display usage information",
            run: (args) => {
                CLI.printHelp()
            }
        }
    }

    static start(args: string[]){
        const [ command, ...restArgs ] = args;

        if (!command) {
            CLI.printHelp();
            process.exit(1);
        }

        const def = CLI.commands[command];

        if(!def){
            console.warn(`Unknown command: ${command}`);
            CLI.printHelp();
            process.exit(1);
        }

        def.run(restArgs, { rawArgs: args });

    }

    private static printHelp(){
        console.info("Usage:");
        for(const [name, def] of Object.entries(CLI.commands)){
            console.info(`  ${def.usage.padEnd(22)} ${def.description}`);
        }

    }



}