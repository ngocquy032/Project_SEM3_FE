import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from '../category-list/category.model';
import { CategorierService } from 'src/service/categories';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  categoryId: number | undefined;
  categoryName: string | undefined;


   constructor(
    private route: ActivatedRoute,
     private categorierService: CategorierService,
     private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId'];
      // this.loadCategory(this.categoryId);
    })

  }

  // loadCategory(categoryId: number): void {
  //   this.categorierService.getCategoryById(categoryId).subscribe(category => {
  //     this.category = category;
  //   });
  // }
  Update(): void {

  }

}
