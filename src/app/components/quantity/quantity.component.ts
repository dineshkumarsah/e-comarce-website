import { Component, Input, OnInit } from '@angular/core';
import { product } from 'src/app/models/product.model';
import {CartService} from 'src/app/service/cart/cart.service'

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {
  quantity: number;
  @Input('products') products:product

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartObservable().subscribe({
      next: (res)=>{
        this.quantity=this.cartService.productQuantity(this.products)
      },
      error: (error)=>{

      }
    })
  }

  decreaseQuantity(){
    debugger
    this.quantity--
    this.cartService.setquantity(this.products,this.quantity)
  }
  increaseQuantity(){
    this.quantity++
    this.cartService.setquantity(this.products,this.quantity)
  }

}
