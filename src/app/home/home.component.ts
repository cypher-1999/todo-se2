import { Component, OnInit } from '@angular/core';
import { TaskCreatedBy } from '../_models/task-models/task-created-by.model';
import { AccountService } from '../_services/account.service';
import { TaskManagerService } from '../_services/task-manager.service';
import {filter, map} from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  createdBy:TaskCreatedBy[]=[];
  userName:string;
  email:string;
  constructor(private route:ActivatedRoute,private router:Router,private accountService:AccountService,private TMService:TaskManagerService) { }

  ngOnInit(): void {
    
    this.accountService.currentUser$.subscribe((user)=>{
      if(user){
      this.userName=user.firstName;
      this.email=user.email
      }
    
    })
    this.TMService.getCreatedBy(this.email)
    .pipe(map(
      (tasks)=>tasks.slice(0,4)
    ))
    .subscribe(
      tasks=>this.createdBy=tasks
    );
   
  }

  toTask(id:number){
    this.router.navigate(['../tasks',id],{relativeTo:this.route});
  }

}
