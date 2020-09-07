import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup} from '@angular/forms'
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/signup/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup

  constructor(private formBuilder:FormBuilder,private userService: UserService) { }

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
      
     },
     error:(error)=>{
      alert("error")
     }
   });
    
   
  }



}
