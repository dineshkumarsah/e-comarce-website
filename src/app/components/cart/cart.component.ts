import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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
export class CartComponent implements OnInit {
  cartItem: cartItems[] = [];
  total=0
  constructor(private cartService: CartService, private productSerice: ProductService) { }

  ngOnInit() {

    this.cartSubcribe();
    
  }

  cartSubcribe(){
    this.cartService.getCartObservable().subscribe({
      next: (cart) => {
        this.cartItem = [];
        let observable = []
        for (let id in cart) {
          observable.push(this.productSerice.getProductById(id).
            pipe(
              map((product) => {
                this.total+=(product.price* cart[id])
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

}
