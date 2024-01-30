import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { CategorierService } from 'src/service/categories';
import { ProductService } from 'src/service/products';
import { FormGroup, FormControl } from '@angular/forms';
import { Options } from 'ngx-slider-v2';
import { filter } from 'rxjs/operators';

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
  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  selectedCategory: string | null = null;
  searchTerm: string = '';
  noResultsFound: boolean = false;
  noProductsInCategory: boolean = false;
  quantity: number = 1;
  constructor(
    private categoriService: CategorierService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(1, 0); // Cuộn trang lên đầu mỗi khi có sự kiện NavigationEnd
      });

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
      } else {
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
    this.productService.getProductDTO().subscribe(product => {
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

  searchPrice() {
    // Lọc danh sách sản phẩm dựa trên giá
    this.filteredProducts = this.products.filter(product => {
      const price = product.price || 0;
      return price >= this.value && price <= this.highValue;
    });

    // Cập nhật đường dẫn (URL) với query parameter 'price'
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: { price: `${this.value}-${this.highValue}` },
    //   queryParamsHandling: 'merge',
    // }
    // );
    // this.currentPage = 1;
  }

  addWishift(productId: any) {
    this.productService.getProductByIdDTO(productId).subscribe(productToAdd => {
      if (productToAdd) {
        const localStorageData = localStorage.getItem('wishlist');
        let currentWishlist: any[] = [];

        if (localStorageData) {
          // Nếu LocalStorage có dữ liệu, chuyển đổi thành mảng
          currentWishlist = JSON.parse(localStorageData);
        }

        const isProductInWishlist = currentWishlist.some(product => product.productId === productId);
        if (!isProductInWishlist) {
          currentWishlist.push(productToAdd);
          console.log('Sản phẩm đã được thêm vào wishlist:', productToAdd);
          alert(`Your product ${productToAdd.title} has been added to favorites`);
          // Lưu danh sách mong muốn đã cập nhật trở lại LocalStorage
          localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
        } else {
          alert(`Your product ${productToAdd.title} is already in favorites`);
        }
      }
    });
  }

  addCart(productId: number) {
    this.productService.getProductByIdDTO(productId).subscribe(productToAdd => {
      if (productToAdd) {
        const localStorageData = localStorage.getItem('cart');
        let currentCart: any[] = [];

        if (localStorageData) {
          // Nếu LocalStorage có dữ liệu, chuyển đổi thành mảng
          currentCart = JSON.parse(localStorageData);
        }
        const existingProductIndex = currentCart.findIndex(item => item.productId === productId);
        if (existingProductIndex !== -1) {
          currentCart[existingProductIndex].quantity += this.quantity;
          alert(`Product ${productToAdd.title} quantity updated in the cart`);
        } else {
          const productToCart = {
            productId: productId,
            productCart: productToAdd,
            quantity: this.quantity
          };
          currentCart.push(productToCart);
          alert(`Product ${productToAdd.title} has been added to the cart`);
        }
        // Lưu giỏ hàng đã cập nhật trở lại LocalStorage
        localStorage.setItem('cart', JSON.stringify(currentCart));
        this.quantity = 1;
      }
    });

  }

  productDetails(productId: string): void {
    this.router.navigate(['/productDetails', productId]);
  }

  pageChanged(newPage: number) {
    this.currentPage = newPage;
  }
}
