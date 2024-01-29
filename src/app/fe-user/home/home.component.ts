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
  quantity: number = 1;
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductDTO().subscribe(product => {
      this.newProducts = product.slice(0, 8);
      this.productSales = product.slice(18, 26);
      this.productBestSallers = product.slice(9, 17);

    });
  }

  productDetails(productId: string): void {
    this.router.navigate(['/productDetails', productId]);
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
          currentCart[existingProductIndex].subTotal = currentCart[existingProductIndex].quantity * productToAdd.price;

          alert(`Product ${productToAdd.title} quantity updated in the cart`);
        } else {
          const productToCart = {
            productId: productId,
            productCart: productToAdd,
            quantity: this.quantity,
            subTotal: this.quantity * productToAdd.price
          };
          currentCart.push(productToCart);
          alert(`Product ${productToAdd.title} has been added to the cart`);
        }
        // Lưu giỏ hàng đã cập nhật trở lại LocalStorage
        localStorage.setItem('cart', JSON.stringify(currentCart));
      }
    });

  }
}
