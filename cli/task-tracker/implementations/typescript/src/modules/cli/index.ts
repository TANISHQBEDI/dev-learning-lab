

export class CLI{

    static start(args: string[]){
        const [ command, ...restArgs ] = args;

        console.info(command);

    }

}