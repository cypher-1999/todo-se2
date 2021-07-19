import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './_guards/auth.guard';
import { TasksComponent } from './tasks/tasks.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';

const routes: Routes = [
  {path:"",component:LandingComponent},
  {path:"",runGuardsAndResolvers:"always",canActivate:[AuthGuard],children:[
  {path:"home",component:HomeComponent },
  {path:"tasks",component:TasksComponent , children:[
    {path:":id",component:EditTaskComponent}
  ]},
  {path:"task",component:TaskComponent },
  {path:"project",component:ProjectComponent}
  ]},
  {path:"**",component:LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
