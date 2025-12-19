import * as process from "node:process";
import {CLI} from "./modules/cli/index.js";
import * as path from "node:path";
import * as fs from "node:fs";
import {STORE_DIR, STORE_PATH} from "./constants/index.js";


class TaskTracker{

    constructor() {
        this.init()
    }

    init(){
        try{
            fs.mkdirSync(STORE_DIR, { recursive: true });
            if(!fs.existsSync(STORE_PATH)) {
                fs.writeFileSync(STORE_PATH, JSON.stringify({tasks:[]}), {encoding: "utf-8"});
            }
        }catch (e){
            console.error("Error initializing data store:", e);
            process.exit(1);
        }

    }


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