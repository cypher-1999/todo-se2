export class User{
    email:string;
    firstName:string;
    lastName:string;
    token:string;

    constructor(user:Object){
        Object.assign(this,user);
    }
}