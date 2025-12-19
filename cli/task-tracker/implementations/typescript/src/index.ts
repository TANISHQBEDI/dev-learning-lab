import * as process from "node:process";


class TaskTracker{

    constructor() {}

    main(){
        console.log("Task Tracker Application Started");
    }

    static bootstrap(args: string[]){
        const app = new TaskTracker();
        app.main();
    }

}

TaskTracker.bootstrap(process.argv.splice(2));