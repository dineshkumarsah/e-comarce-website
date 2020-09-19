import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/signup/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  error: string;
  success: string;

  constructor(private formBuilder:FormBuilder,private userService: UserService
    ,private router: Router) { }

  ngOnInit() {
    this.signupForm=this.formBuilder.group({
      name:[''],
      email:[],
      password:[''],
      phone: ['']
    })

  }

  onSubmit(){
   let user: User={
     name:this.signupForm.controls.name.value,
     email:this.signupForm.controls.email.value,
     password:this.signupForm.controls.password.value,
     phone: this.signupForm.controls.phone.value
   }

   this.userService.signUp(user).subscribe({
     next: (result)=>{
      console.log(result);
      this.success=result.message;
      this.error=undefined;
      this.signupForm.reset();
      this.router.navigate(['login']);
      
      
     },
     error:(response:HttpErrorResponse)=>{
     this.error=response.error.error.message;
     this.success=undefined
     }
   });
    
   
  }



}
