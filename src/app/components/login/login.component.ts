import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/signup/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
   loginForm: FormGroup;
   userUnSubscription:Subscription
   success:string;
   error: string;
  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router) { }

  ngOnInit() {
   this.loginForm= this.fb.group({
      email:[''],
      password:['']
    })
  }
  login(){
    let credential={
     "email":this.loginForm.value.email,
     "password": this.loginForm.value.password
    }
 this.userUnSubscription=  this.userservice.login(credential).subscribe({
     next: (res)=>{
       this.success= res.message;
       this.error=undefined;
       this.router.navigate([''])
       console.log(res);  
     },
     error: (error: HttpErrorResponse)=>{
       this.error= error.error.error.message;
       this.success=undefined
       console.log(error);
       
     }

   })
    
  }
  ngOnDestroy(){
    this.userUnSubscription.unsubscribe();
  }

}
