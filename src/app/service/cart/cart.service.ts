import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { product } from 'src/app/models/product.model'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = {};
  private _observable: BehaviorSubject<Object>
  constructor() {
    if (!this.isCartExist()) {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
    this.readDataFromLocalStorage();
    this._observable = new BehaviorSubject(this.cart)
  }
  readDataFromLocalStorage() {
    return this.cart = JSON.parse(localStorage.getItem('cart'))
  }
  writeDataToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(this.cart)) 
  }

  addToCart(product: product) {
    let quantity = this.cart[product._id];
    if (quantity) {
      this.cart[product._id] = (+quantity) + 1;
    } else {
      this.cart[product._id] = 1
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this._observable.next(this.cart)
  }

  getCartObservable() {
    return this._observable;
  }
  removeFromCart(product: product) {

  }
  isCartExist() {
    if (localStorage.getItem('cart')) {
      return true;
    } else {
      return false
    }
  }
  productQuantity(Product: product){
    return this.cart[Product._id]? +this.cart[Product._id]:0
  }

  setquantity(Product: product,quantity: number){
    if(quantity<1){
      delete this.cart[Product._id];}
      else{
        this.cart[Product._id]=quantity
      }
      this.writeDataToLocalStorage();
      this._observable.next(this.cart)
    }
  
}
