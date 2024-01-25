import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorierService } from 'src/service/categories';
import { CategoryModel } from './category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: [
    './category-list.component.css',
    '../../../assets/admin/css/demo.css',
    '../../../assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',
    '../../../assets/admin/vendor/libs/typeahead-js/typeahead.css',
    '../../../assets/admin/vendor/libs/datatables-bs5/datatables.bootstrap5.css',
    '../../../assets/admin/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css',
    '../../../assets/admin/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css',
    '../../../assets/admin/vendor/libs/select2/select2.css',
    '../../../assets/admin/vendor/libs/@form-validation/umd/styles/index.min.css',
    '../../../assets/admin/vendor/libs/quill/typography.css',
    '../../../assets/admin/vendor/libs/quill/katex.css',
    '../../../assets/admin/vendor/libs/quill/editor.css',
    '../../../assets/admin/vendor/css/pages/app-ecommerce.css',
    '../../../assets/admin/vendor/css/rtl/core.css',
    '../../../assets/admin/vendor/css/rtl/theme-default.css',
    '../../../assets/admin/vendor/fonts/boxicons.css',
    '../../../assets/admin/vendor/fonts/fontawesome.css',
    '../../../assets/admin/vendor/fonts/flag-icons.css',

  ]
})
export class CategoryListComponent implements OnInit {
  listCategori: any[] = [];
  formAddCategory: FormGroup;
  selectedCategory: any;
  filterCategory: any[] = [];
  searchTerm: string = '';
  constructor(
    private categoriService: CategorierService,
    private FormBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formAddCategory = FormBuilder.group({
      nameCategory: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getCategori();
  }

  getCategori() {
    this.categoriService.getCategorie().subscribe(category => {
      this.filterCategory = category
      this.listCategori = category;
    })
  }

  searchCategoryByName() {
    // Lọc danh sách sản phẩm dựa trên tên
    this.filterCategory = this.listCategori.filter(category =>
      category.nameCategory.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: this.searchTerm},
      queryParamsHandling: 'merge',
    });
  }

  addCategory() {
    if (this.formAddCategory.valid) {
      const categoryData: CategoryModel = this.formAddCategory.value;
      this.categoriService.addCategorie(categoryData).subscribe(
        response => {
          // Xử lý phản hồi thành công từ API (nếu cần)
          console.log('Category added successfully', response);
          this.formAddCategory.reset();
          window.location.reload();
        },
        error => {
          // Xử lý lỗi từ API (nếu cần)
          console.error('Error adding category', error);
        }
      );
    }
  }

  deleteCategory(categoryId: number) {
    if (confirm('Are you sure you want to delete')) {
      this.categoriService.deleteCategory(categoryId).subscribe(
        () => {
          // Xóa thành công, làm những gì đó nếu cần
          console.log('Category deleted successfully');
          this.getCategori();
        },
        (error) => {
          // Xử lý lỗi nếu có
          console.error('Error deleting category:', error);
        }
      );
    }
  }

  updateCategory(categoryId: number): void {
    this.router.navigate(['/admin/updateCategory', categoryId]);
  }

}
