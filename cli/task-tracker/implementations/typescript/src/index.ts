import * as process from "node:process";
import {CLI} from "./modules/cli/index.js";


class TaskTracker{

    constructor() {}

    main(args: string[]){
        if(args.length === 0) {
            console.warn("No arguments provided. Please use --help for usage information.");
            process.exit(1);
        }
        CLI.start(args);
    }

    static bootstrap(args: string[]){
        const app = new TaskTracker();
        app.main(args);
    }

}

TaskTracker.bootstrap(process.argv.splice(2));