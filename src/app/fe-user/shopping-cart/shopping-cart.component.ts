import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartList: any[] = [];
  quantity: number = 1;
  total: number = 0;
  totalPrice: number = 0;
  constructor(
    private router: Router,
    private authService: AuthService
  ){

  }

  ngOnInit(): void {
    this.getProductToCart();
    this.updateCartTotals();
  }

  getProductToCart() {
    const localStorageData = localStorage.getItem('cart');
    if (localStorageData) {
      this.cartList = JSON.parse(localStorageData);
    }
  }
  deleteItem(productId: string){
    if(confirm(`Are you sure you want to delete`)){
      this.cartList = this.cartList.filter(item => item.productId !== productId);
      // Cập nhật localStorage
      this.updateLocalStorage();
      this.updateCartTotals();
    }
  }


  decreaseQuantity(index: number) {
    if (this.cartList[index].quantity > 1) {
      this.cartList[index].quantity--;
      this.updateSubtotal(index);
      this.updateLocalStorage();
    }
  }

  increaseQuantity(index: number) {
    this.cartList[index].quantity++;
    this.updateSubtotal(index);
    this.updateLocalStorage();
  }

  updateSubtotal(index: number) {
    this.cartList[index].subtotal = this.calculateSubtotal(this.cartList[index]);
    this.updateCartTotals();
  }

  calculateSubtotal(item: any): number {
    return item.productCart.price * item.quantity;
  }

  calculateCartSubtotal(): number {
    return this.cartList.reduce((total, item) => total + (item.subtotal || this.calculateSubtotal(item)), 0);
  }

  calculateCartTotal(): number {
    return this.calculateCartSubtotal();
  }

  updateCartTotals() {
    this.total = this.calculateCartTotal();
    this.totalPrice = this.calculateCartTotal();
    console.log('total',this.totalPrice );
  }

  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartList));
  }


  checkOut(){

    if(this.authService.isLoggedIn()){
      this.router.navigate(['/checkOut'])
    }else{
      alert('You are not logged in, please log in to continue');
      this.router.navigate(['/login']);
    }

  }

}
