import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from 'src/service/order';
import { UserService } from 'src/service/user';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  selectedMethod: string = 'cash'; // Set default selected method to 'cash'
  cartList: any[] = [];
  dataUser: any = {};
  orderForm: FormGroup;
  discountAmount: number = 0;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private orderService: OrdersService
  ) {
    this.orderForm = this.formBuilder.group({
      couponCode: ['']
    });

  }

  ngOnInit(): void {
    this.getLocalData();
    this.getInfo();
    this.updateCartTotals(); // Gọi hàm cập nhật tổng giỏ hàng
    window.scrollTo(0, 0);
  }


  order(): void {
    if (this.selectedMethod != 'vnpay') {
      console.log('thanh toan tien mat');


    } else {
      console.log('thanh toan vn pay');
    }
  }

  checkCode(): void {
    const couponCode = this.orderForm.get('couponCode');
    const code = couponCode?.value;
    // Check if the entered coupon code is valid
    if (code === 'SALE1') {
      alert('Apply discount code successfully')
      this.discountAmount = 50;
    } else {
      alert('Current discount code is not activated')
      this.discountAmount = 0;
    }
    this.updateCartTotals(); // Cập nhật tổng giỏ hàng sau khi áp dụng mã giảm giá
  }

  getLocalData() {
    const localStorageData = localStorage.getItem('cart');
    if (localStorageData) {
      this.cartList = JSON.parse(localStorageData);
      // Kiểm tra và tính toán subtotal cho các sản phẩm chưa có subtotal
      this.cartList.forEach(item => {
        if (!item.subtotal) {
          item.subtotal = this.calculateSubtotal(item);
        }
      });
    }
  }

  getInfo() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.dataUser = JSON.parse(userInfo);
    }
  }

  calculateSubtotal(item: any): number {
    return item.productCart.price * item.quantity;
  }

  calculateCartSubtotal(): number {
    return this.cartList.reduce((total, item) => total + this.calculateSubtotal(item), 0);
  }

  calculateCartTotal(): number {
    const subtotal = this.calculateCartSubtotal();
    const total = subtotal - this.discountAmount;
    return total > 0 ? total : 0;
  }

  cash() {
    this.selectedMethod = 'cash';
  }

  pay() {
    this.selectedMethod = 'vnpay';
  }

  updateCartTotals() {
    this.cartList.forEach(item => {
      item.subtotal = this.calculateSubtotal(item);
    });
  }
}
