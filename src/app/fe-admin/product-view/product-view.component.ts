import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductService } from 'src/service/products';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: [
    './product-view.component.css',
    '../../../assets/admin/vendor/fonts/boxicons.css',
    '../../../assets/admin/vendor/fonts/fontawesome.css',
    '../../../assets/admin/vendor/fonts/flag-icons.css',
    '../../../assets/admin/vendor/css/rtl/core.css',
    '../../../assets/admin/vendor/css/rtl/theme-default.css',
    '../../../assets/admin/css/demo.css',
    '../../../assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',
    '../../../assets/admin/vendor/libs/typeahead-js/typeahead.css',
    '../../../assets/admin/vendor/libs/quill/typography.css',
    '../../../assets/admin/vendor/libs/quill/katex.css',
    '../../../assets/admin/vendor/libs/quill/editor.css',
    '../../../assets/admin/vendor/libs/select2/select2.css',
    '../../../assets/admin/vendor/libs/dropzone/dropzone.css',
    '../../../assets/admin/vendor/libs/flatpickr/flatpickr.css',
    '../../../assets/admin/vendor/libs/tagify/tagify.css',
    '../../../assets/admin/vendor/css/boostrap/boostrap.css'
  ]
})
export class ProductViewComponent {
  productImages: any;
  selectedFiles: any[] = [];
  categoriList: any[] = [];
  category: any;
  product: any; // Biến để lưu trữ thông tin sản phẩm
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      // Lấy id sản phẩm từ URL
      this.getProductDetails(productId);
      // this.getProductImages(productId);
    });
  }

  getProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (data: any) => {
        this.product = data;
        console.log(" this.product", this.product)
        this.changeDetectorRefs.detectChanges();
        this.getProductCategoryName(data.productCategoryId);
      },
      (error: any) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  getProductCategoryName(categoryId: number): void {
    this.productService.getCategoryById(categoryId).subscribe(
      (data: any) => {
        this.category = data.nameCategory; // Gán tên danh mục vào biến category
      },
      (error: any) => {
        console.error('Error fetching category name:', error);
      }
    );
  }

  getProductImages(productId: number): void {
    this.productService.getProductImages(productId).subscribe(
      (data: any[]) => {
        this.productImages = data;
      },
      (error: any) => {
        console.error('Error fetching product images:', error);
      }
    );
  }

  manageImages(productId: number) {
    this.router.navigate(['admin/productImages', productId])

  }
}
