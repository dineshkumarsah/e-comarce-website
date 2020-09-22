import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/Operators'
import { Category } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url="http://localhost/api/categories"
  constructor(private http: HttpClient) { }

  getCategory(){
    return this.http.get(this.url).pipe(
      map((res)=>{
        return <Category[]>res['categories']
      })
    )
  }
}
