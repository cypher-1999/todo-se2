export class TaskCreatedBy{
    taskId:number;
    assignee:number;
    taskName:string;
    scheduledDate:Date;
    priorityDate:Date;

    constructor(task:Object){
        Object.assign(this,task);
    }
}