import * as fs from "node:fs";
import {STORE_PATH} from "../../constants/index.js";


export class Tasks{

    public tasks: Task[];

    constructor(){
        this.tasks = this.getTaskFromStore();
    }

    getTaskFromStore(){
        const res = JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
        return res.tasks;
    }

    updateStore(){
        fs.writeFileSync(STORE_PATH, JSON.stringify({tasks: this.tasks}, null, 2));
    }

    addTask(newTask: string){
        const task: Task = {
            id: this.tasks.length + 1,
            description: newTask,
            status: "to-do",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        this.tasks.push(task);
        this.updateStore();
    }

    listTasks(status?: TaskStatus){
        console.log("Tasks:");
        console.log(`${'ID'.padEnd(5)}${'Status'.padEnd(20)}Description`);
        if(!status){
            for(const task of this.tasks){
                console.log(`${task.id.toString().padEnd(5)}${task.status.padEnd(20)}${task.description}`);
            }
        }
        const filtered =  this.tasks.filter(task => task.status === status);
        for(const task of filtered){
            console.log(`${task.id.toString().padEnd(5)}${task.status.padEnd(20)}${task.description}`);
        }
    }

    updateTask(id: number, description: string){
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if(taskIndex === -1){
            console.warn(`Task with ID ${id} not found.`);
            return;
        }

        this.tasks[taskIndex]!.description = description;
        this.tasks[taskIndex]!.updatedAt = new Date();
        this.updateStore();
    }

    deleteTask(id: number){
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if(taskIndex === -1){
            console.warn(`Task with ID ${id} not found.`);
            return;
        }

        this.tasks.splice(taskIndex, 1);
        this.updateStore();
    }

    markInProgress(id: number){
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if(taskIndex === -1){
            console.warn(`Task with ID ${id} not found.`);
            return;
        }

        this.tasks[taskIndex]!.status = "in-progress";
        this.tasks[taskIndex]!.updatedAt = new Date();
        this.updateStore();
    }

    markDone(id: number){
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if(taskIndex === -1){
            console.warn(`Task with ID ${id} not found.`);
            return;
        }

        this.tasks[taskIndex]!.status = "done";
        this.tasks[taskIndex]!.updatedAt = new Date();
        this.updateStore();
    }

}