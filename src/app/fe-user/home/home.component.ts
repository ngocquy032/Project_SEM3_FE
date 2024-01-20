import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/service/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  newProducts: any[] = [];
  productSales: any[] = [];
  productBestSallers: any[] = [];
  productImages: any[] = [];
  ToCart: any[] = [];
  wishift: any[] = [];
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct().subscribe(product => {
      this.newProducts = product.slice(0, 8);
      this.productSales = product.slice(18, 26);
      this.productBestSallers = product.slice(9, 17);

    });
  }

  productDetails(productId: string): void {
    this.router.navigate(['/productDetails', productId]);
  }
  addToCart(product: any) {
    if (!product || !product.productId) {
      console.error('Product không hợp lệ!', product);
      let a = this.ToCart.push({
        product_id: product.productId,
        price: product.price,
        title: product.title,
        path: product.path
      });
      console.log('a',a)
    }

    // Thêm sản phẩm vào danh sách mong muốn
    
    // Lưu danh sách mong muốn đã cập nhật trở lại LocalStorage
    localStorage.setItem('wishlist', JSON.stringify(this.ToCart));
    console.log('Sản phẩm được thêm vào mong muốn:', product.title);
  }

  addWishift(productId: any) {
    this.productService.getProductById(productId).subscribe(productToAdd => {
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
}
