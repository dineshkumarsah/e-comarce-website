import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { product } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart/cart.service'
import { ProductService } from 'src/app/service/product/product.service';

interface cartItems {
  product: product,
  quantity: number;

}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItem: cartItems[] = [];
  total=0
  carSubscription: Subscription
  constructor(private cartService: CartService, private productSerice: ProductService) { }

  ngOnInit() {

    this.cartSubcribe();
    
  }

  cartSubcribe(){
    let total = 0;
   this.carSubscription= this.cartService.getCartObservable().subscribe({
      next: (cart) => {
        // this.cartItem = [];
        let observable = []; 
        total=0;
        if(Object.keys(cart).length==0){
          this.cartItem = []
        }
       
        for (let id in cart) {
          observable.push(this.productSerice.getProductById(id).
            pipe(
              map((product) => {
                total+=(product.price* cart[id])
                let item: cartItems = {
                  product: product,
                  quantity: cart[id]
                }
                return item
              })
            )
          )
          forkJoin(observable).subscribe({
            next: (res: cartItems[]) => {
              this.cartItem = res;
              console.log(res);
              this.total=total
            },
            error: (error) => {
              console.log(error);

            }
          });
        }
      },
      error: (error) => {
        console.log(error);

      }
    });
  }

  ngOnDestroy(){
    this.carSubscription.unsubscribe();
  }

}
