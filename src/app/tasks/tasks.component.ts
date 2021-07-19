import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskCreatedBy } from '../_models/task-models/task-created-by.model';
import { AccountService } from '../_services/account.service';
import { TaskManagerService } from '../_services/task-manager.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  createdBy:TaskCreatedBy[]=[];
  userName:string;
  email:string;
  id:number
  constructor(private route:ActivatedRoute,private router:Router,private accountService:AccountService,private TMService:TaskManagerService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user)=>{
      if(user){
      this.userName=user.firstName;
      this.email=user.email
      }
    
    })
    this.TMService.getCreatedBy(this.email)
    .subscribe(
      tasks=>this.createdBy=tasks
    );
    this.TMService.currentEditTask.subscribe(id=>this.id=id);
  }

  toTask(id:number){
    this.router.navigate([id],{relativeTo:this.route});
    this.id=id;
  }

}
