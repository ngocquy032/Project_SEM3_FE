// product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/service/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  productCart: any;
  quantity: number = 1;
  cart: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.getProductDetails(productId);
    });
  }

  getProductDetails(productId: number): void {
    this.productService.getProductByIdDTO(productId).subscribe(product => {
      this.product = product;
      console.log(" this.productdetal", this.product)
    });
  }

  addToCart(productId: any) {
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
        this.quantity = 1;
      }
    });
  }

  addToWishift(productId: number) {
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

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  increaseQuantity() {
    this.quantity++;
  }
}
