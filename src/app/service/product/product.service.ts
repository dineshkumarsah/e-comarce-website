import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {UserService} from 'src/app/service/signup/user.service';
import { map } from 'rxjs/operators'
import { product } from 'src/app/models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl="http://localhost/api/products"

  constructor(private http: HttpClient, private userservice: UserService) { }

  getAllProduct(params){

    let query= new URLSearchParams();

    if(params['category']){
      query.append('category',params['category'])
    }
    return this.http.get(`${this.productUrl}?${query.toString()}`,{
      headers:{
        'authorization': this.userservice.getToken()
      }
    }).pipe(
      map((result: {count: string,products: product[]})=>{
         return result.products
      })
    )
  }
  getProductById(id: string){
    return this.http.get(`${this.productUrl}/${id}`,{
      headers:{
        'authorization': this.userservice.getToken()
      }
    }).pipe(
      map((result)=>{
         return <product>result
      })
    )
  }
}
