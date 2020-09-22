import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/product.model';
import {ProductService} from 'src/app/service/product/product.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: product[]=[]

  constructor(private pservice: ProductService) { }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts(){
    this.pservice.getAllProduct().subscribe({
      next: (products)=>{
        this.products = products
        console.log(this.products);
        
      },
      error: (error)=>{
        console.log(error);
        
      }
    })
  }

}
