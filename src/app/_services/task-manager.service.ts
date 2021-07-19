import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { AddTask } from '../_models/task-models/add-task.model';
import { TaskCreatedBy } from '../_models/task-models/task-created-by.model';
import { User } from '../_models/user.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  private baseUrl:string="https://localhost:44361/api/ProjectTasks/";
  //createBy=new EventEmitter<TaskCreatedBy[]>();
  users= new ReplaySubject<User[]>(1);
  currentEditTask = new Subject<number>();

  constructor(private http:HttpClient,private accountService:AccountService,private toastr:ToastrService) { 
   
  }
  ngOnInit() {
    
  }
 
  getCreatedBy(email:string){
    console.log(email);
     return this.http.get<TaskCreatedBy[]>(this.baseUrl+"createdBy",{
      params:{
        email:email
      }
    });
  }

  getAllUsers(){
    this.http.get<User[]>(this.baseUrl + "allUsers").subscribe(
      (responseUsers)=>{
        this.users.next(responseUsers);
        //console.log(responseUsers);
      }
    );
  }

  addNewTask(task:AddTask)
  {
    this.http.post(this.baseUrl+"createTask",task,{
      responseType:"text"
    }).subscribe(
      (res)=>{
        //console.log(JSON.parse(res));
        this.toastr.success(res);
      },
      (err)=>{
        console.log(err);
        
      }
    )
  }
}
