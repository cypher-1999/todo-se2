import { AfterContentInit, AfterViewInit, Component, NgModule, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddTask } from '../_models/task-models/add-task.model';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';
import { TaskManagerService } from '../_services/task-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit,OnDestroy {
  users:User[];
  subsc:Subscription;
  @ViewChild('addTaskForm')addTaskForm:NgForm;
  constructor(private taskManagerService:TaskManagerService,private accountService:AccountService) { }
 

  ngOnInit():void {
   this.subsc= this.taskManagerService.users.subscribe(u =>{console.log("Users are: "+u); this.users=u});
  }

  ngOnDestroy(){
   
    this.subsc.unsubscribe();
   
  }
 
  addTask(){
    let user;
    this.accountService.currentUser$.subscribe(u => user=u);
    var task = new AddTask({
    taskName:this.addTaskForm.value.taskName,
    assigneeEmail:this.addTaskForm.value.assignee,
    scheduledDate:this.addTaskForm.value.scheduledDate,
    priority:this.addTaskForm.value.scheduledDate,
    createdByEmail:user.email
    });
    console.log(task);
    this.taskManagerService.addNewTask(task);
  }
}
