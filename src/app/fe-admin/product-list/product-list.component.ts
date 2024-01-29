import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/service/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [
    '../../../assets/admin/vendor/fonts/boxicons.css',
    '../../../assets/admin/vendor/fonts/fontawesome.css',
    '../../../assets/admin/vendor/fonts/flag-icons.css',
    '../../../assets/admin/vendor/css/rtl/core.css',
    '../../../assets/admin/vendor/css/rtl/theme-default.css',
    '../../../assets/admin/css/demo.css',
    '../../../assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',
    '../../../assets/admin/vendor/libs/typeahead-js/typeahead.css',
    '../../../assets/admin/vendor/libs/datatables-bs5/datatables.bootstrap5.css',
    '../../../assets/admin/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css',
    '../../../assets/admin/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css',
    '../../../assets/admin/vendor/libs/select2/select2.css'
  ]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  filteredProducts: any[] = [];
  searchTerm: string = '';
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductDTO().subscribe(product => {
      this.filteredProducts = product.reverse();
      this.products = product;
    });
  }

  pageChanged(newPage: number) {
    this.currentPage = newPage;
  }
  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          // Xóa thành công, làm những gì đó nếu cần
          console.log('Product deleted successfully');
          this.getProduct();
        },
        (error) => {
          // Xử lý lỗi nếu có
          console.error('Error deleting category:', error);
        }
      );
    }
  }

  searchProductByName() {
    // Lọc danh sách sản phẩm dựa trên tên
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    // console.log('filteredProducts', this.filteredProducts);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { product: this.searchTerm},
      queryParamsHandling: 'merge',
    });
  }

  productDetails(productId: number){
    this.router.navigate(['/admin/productDetails', productId]);

  }



}
