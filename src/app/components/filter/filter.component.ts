import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/categories.model';
import {CategoryService} from 'src/app/service/category.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  categories: Category[]=[];

  constructor(private categoryService: CategoryService, private router: Router) {  }
  min:number[]=[];
  max:any[]=[];
  ngOnInit() {
    this. getAllCategory();
    this. minMaxOption()
  }

  selctedId(category_Id: string){
    this.router.navigate([''],{
      queryParams:{
       'category': category_Id
      }
    })
    
  }

  getAllCategory(){
    this.categoryService.getCategory().subscribe({
      next: (result)=>{
        this.categories=result
        console.log(result);
        
      },
      error:(res: HttpErrorResponse)=>{
        console.log(res);
        
      }
    });
  }
  minMaxOption(){
     Array(10).fill('').forEach((e,index)=>{
       this.min.push((index+1)*100)
     })
  }
  maxOption(minValue: number){
   this.max=[]
    Array(10).fill('').forEach((e,index)=>{
      this.max.push(+minValue+((index+1)*100))
    })
    this.max.push(this.max[this.max.length-1]+"+")
 }

 filter(maxPrice: number,minPrice: number){
   console.log(maxPrice,minPrice);
   
 }



}
