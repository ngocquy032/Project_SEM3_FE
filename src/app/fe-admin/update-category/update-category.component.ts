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
  categoryId!: number;
  categoryName: string = '';

  constructor(
    private route: ActivatedRoute,
    private categorierService: CategorierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.getCategoryDetails(this.categoryId);
    });
  }

  getCategoryDetails(categoryId: number): void {
    this.categorierService.getCategoryById(categoryId).subscribe((data: any) => {
      this.categoryName = data.nameCategory;
    });
  }
  Cancle(){
    this.router.navigate(['/admin/categoryList']);
  }

  Update(): void {

    const data: CategoryModel = {
      categoryId: this.categoryId,
      nameCategory: this.categoryName
    };
    console.log('data', data);

    if(confirm('Are you sure you want to update ')){
      this.categorierService.updateCategory(data).subscribe(
        (datasuscce: any)=>{
          console.log('Category updated successfully.', datasuscce);
          this.router.navigate(['/admin/categoryList']);
        }
      )
    }
  }
}
