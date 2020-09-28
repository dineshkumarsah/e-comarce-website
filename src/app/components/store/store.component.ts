import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { product } from 'src/app/models/product.model';
import {ProductService} from 'src/app/service/product/product.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: product[]=[]

  constructor(private pservice: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.getAllProducts()
    this.route.queryParamMap.subscribe({
      next:(res: ParamMap)=>{
        let categoryId=res.get("category")
         console.log(categoryId);
         this.getAllProducts({category:categoryId })
         
      }
    })
  }

  getAllProducts(prams){
    this.pservice.getAllProduct(prams).subscribe({
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
