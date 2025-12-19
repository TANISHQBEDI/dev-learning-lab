export {};

declare global{
    type TaskStatus = "to-do" | "in-progress" | "done";

    interface Task{
        id: number;
        description: string;
        status: TaskStatus;
        createdAt: Date;
        updatedAt: Date;
    }

    type CommandContext = { rawArgs: string[] };

    type CommandDefinition = {
        usage: string;
        description: string;
        run: (args: string[], ctx: CommandContext) => void;
    }

    type CommandRegistry = Record<string, CommandDefinition>;

}