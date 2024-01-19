import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategorierService } from 'src/service/categories';
import { ProductService } from 'src/service/products';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  selectedCategory: string | null = null;
  searchTerm: string = '';
  noResultsFound: boolean = false;
  noProductsInCategory: boolean = false;
  constructor(
    private categoriService: CategorierService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {

    this.getCategorie();
    // this.getProduct();
    // Lắng nghe sự kiện thay đổi query parameter 'category'
    this.route.queryParams.subscribe(params => {
      const categoryId = params['category'];
      const searchTerm = params['search'];
      if (categoryId) {
        this.searchCategories(Number(categoryId));
      } else if (searchTerm) {
        this.searchProductByName();
      }else{
        this.getProduct();
      }


    });
  }

  getCategorie() {
    this.categoriService.getCategorie().subscribe(getCategori => {
      this.categories = getCategori;
    });
  }

  getProduct() {
    this.productService.getProduct().subscribe(product => {
      this.filteredProducts = product;
      this.products = product;
    });
  }
  // searchProduct
  searchProductByName() {
    // Lọc danh sách sản phẩm dựa trên tên
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: { product: this.searchTerm},
    //   queryParamsHandling: 'merge',
    // });
  }
  // search categori
  searchCategories(categoryId: number) {
    // Lọc danh sách sản phẩm dựa trên categoryId
    this.filteredProducts = this.products.filter(product => product.categoryId === categoryId);
    this.selectedCategory = this.categories.find(category => category.categoryId === categoryId)?.nameCategory;

    // Cập nhật đường dẫn (URL) với query parameter 'category'
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: categoryId },
      queryParamsHandling: 'merge',
    });
  }

  productDetails(productId: string): void {
    this.router.navigate(['/productDetails', productId]);
  }

  pageChanged(newPage: number) {
    this.currentPage = newPage;
  }
}
