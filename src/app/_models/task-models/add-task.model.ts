export class AddTask{
    taskName:string;
    assigneeEmail:string;
    scheduledDate:Date;
    priority:Date;
    createdByEmail:string;

//     {
//   "taskName": "string",
//   "assigneeEmail": "string",
//   "scheduledDate": "2021-07-06T12:09:55.412Z",
//   "priority": "2021-07-06T12:09:55.412Z",
//   "createdByEmail": "string"
// }

    constructor(task:Object)
    {
        Object.assign(this,task);
    }
}