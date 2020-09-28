import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CartService} from 'src/app/service/cart/cart.service'
import { UserService } from 'src/app/service/signup/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  quantity: number=0;
  isLoggedIn=false
  isAdmin: boolean;

  constructor(private catService: CartService, private userService: UserService,
    private roter: Router) { }

  ngOnInit() {
    this.catService.getCartObservable().subscribe({
      next : (res)=>{
       this.quantity= Object.keys(res).length
        console.log(this.quantity);
        
      },
      error: (res_error)=>{
        console.log(res_error);
        
      }
    })

    this.userService.loginObservable.subscribe({
      next: ()=>{
        let token=this.userService.getToken();
        if(token!=''){
        
          this.isLoggedIn= true
          this.checkAdmin()
        }else{
          this.isLoggedIn= false
         
        }
      }
    });
  }

  logout(){
   this.userService.logOut();
   this.roter.navigate(['\login'])

  }
  checkAdmin(){
   
    this.userService.isAdmin().subscribe({
      next:(isAdmin)=>{
       
        
       this.isAdmin=isAdmin
        
      }
    })
  }

}
