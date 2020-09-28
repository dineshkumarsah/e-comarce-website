import { Input, Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/product.model';
import {CartService} from 'src/app/service/cart/cart.service'

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  @Input('products') products:product
  quantity: number;
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
  addToCart(){
    
  this.cartService.addToCart(this.products)
    
  }
  // decreaseQuantity(){
  //   this.quantity--
  //   this.cartService.setquantity(this.products,this.quantity)
  // }
  // increaseQuantity(){
  //   this.quantity++
  //   this.cartService.setquantity(this.products,this.quantity)
  // }

}
