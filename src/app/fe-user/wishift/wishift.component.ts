import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from 'src/service/products';
@Component({
  selector: 'app-wishift',
  templateUrl: './wishift.component.html',
  styleUrls: ['./wishift.component.css']
})
export class WishiftComponent implements OnInit {
  wishList: any[] = [];
  hasItems: boolean = true;
  quantity: number = 1;
  constructor(
    private location: Location,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.getWishList();
  }
  private getWishList() {
    const localStorageData = localStorage.getItem('wishlist');
    if (localStorageData) {
      this.wishList = JSON.parse(localStorageData);
      this.hasItems = this.wishList.length > 0;
    } else {
      this.hasItems = false;
    }
  }
  deleteItem(productId: string): void {
    // Lọc sản phẩm có productId để xóa khỏi wishList
    if (confirm(`Are you sure you want to delete`)) {
      this.wishList = this.wishList.filter(item => item.productId !== productId);
      // Cập nhật localStorage
      localStorage.setItem('wishlist', JSON.stringify(this.wishList));
    }
  }

  // addToCart(productId: string): void {
  //   const cartListString = localStorage.getItem('cart');
  //   if (cartListString) {
  //     const cartList = JSON.parse(cartListString);
  //     const existingItem = cartList.find((item: any) => item.productId === productId);
  //     console.log('existingItem', existingItem);
  //     if (existingItem) {
  //       existingItem.quantity += 1;
  //     } else {
  //       const selectedItem = this.wishList.find(item => item.productId === productId);

  //       if (selectedItem) {
  //         const newItem = {
  //           productId: selectedItem.productId,
  //           productCart: selectedItem.cartListString,
  //           quantity: 1,
  //         };
  //         cartList.push(newItem);
  //       }
  //       console.log('cartList', cartList);
  //       // localStorage.setItem('cart', JSON.stringify(cartList));
  //     }
  //   }
  // }
  addToCart(productId: any) {
    this.productService.getProductById(productId).subscribe(productToAdd => {
      if (productToAdd) {
        const cartListString = localStorage.getItem('cart');
        let cartList: any[] = [];

        if (cartListString) {
          // Nếu LocalStorage có dữ liệu, chuyển đổi thành mảng
          cartList = JSON.parse(cartListString);
        }
        const existingProductIndex = cartList.findIndex(item => item.productId === productId);
        if (existingProductIndex !== -1) {
          cartList[existingProductIndex].quantity += this.quantity;
          cartList[existingProductIndex].subTotal = cartList[existingProductIndex].quantity * productToAdd.price;

          alert(`Product ${productToAdd.title} quantity updated in the cart`);
        } else {
          const newItem = {
            productId: productId,
            productCart: productToAdd,
            quantity: this.quantity,
            subTotal: this.quantity * productToAdd.price

            // Thêm các trường khác bạn muốn vào đây
          };
          cartList.push(newItem);
          alert(`Product ${productToAdd.title} has been added to the cart`);
          console.log('cartList', cartList);

        }

        // Lưu giỏ hàng đã cập nhật trở lại LocalStorage
        localStorage.setItem('cart', JSON.stringify(cartList));
        console.log('cartList2', cartList);


      }
    });
  }





}
