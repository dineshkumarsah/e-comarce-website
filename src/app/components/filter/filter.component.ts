import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/categories.model';
import {CategoryService} from 'src/app/service/category.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  categories: Category[]=[];

  constructor(private categoryService: CategoryService) {  }

  ngOnInit() {
    this. getAllCategory()
  }

  selctedId(categoryId: string){
    console.log(categoryId);
    
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

}
