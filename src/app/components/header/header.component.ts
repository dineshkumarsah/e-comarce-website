import { Component, OnInit } from '@angular/core';
import {CartService} from 'src/app/service/cart/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  quantity: number=0;

  constructor(private catService: CartService) { }

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
  }

}
