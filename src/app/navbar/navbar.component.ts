import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../_models/login.model';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username:string;
  password:string;
  name:string;
  constructor(public accountService:AccountService,private router:Router) { 
    
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user)=>{
      if(user)
      this.name=user.firstName+" "+user.lastName;
     //console.log(user);
    });
  }
   onLogin(){
   this.accountService.login(this.username,this.password);
   
  }
}
