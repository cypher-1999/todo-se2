import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { Login } from '../_models/login.model';
import { User } from '../_models/user.model';
import {map} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl:string="https://localhost:44361/api/users/"
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();  
  constructor(private http:HttpClient,private toastr:ToastrService,private router:Router) { }

  login(username:string,password:string){
    this.http.post(this.baseUrl+"login",new Login(username,password)).pipe(
      map(
        (user:User)=>{
          this.currentUserSource.next(new User(user));
          localStorage.setItem('user',JSON.stringify(user)); 
        }
      )
    ).subscribe(
      (response)=>{
        console.log(response);
         this.router.navigate(['home']);
    },
      (error)=>{
        console.log(error);
        this.toastr.error(error.error);
      }
      );
  }

  logout(){
    localStorage.setItem('user',null);
    this.currentUserSource.next(null);
    this.router.navigate(['']);

  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
    
  }
}
