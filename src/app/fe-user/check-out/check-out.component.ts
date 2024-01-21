import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private formBuilder: FormBuilder
    ) {
      this.orderForm = this.formBuilder.group({
        couponCode: ['']
      });
     }

  ngOnInit(): void {
    this.getLocalData();
    this.getInfo();
  }
  order(): void {
    if (this.selectedMethod != 'vnpay') {
      console.log('thanh toan tien mat');

    } else{
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
  }

  getLocalData() {
    const localStorageData = localStorage.getItem('cart');
    if (localStorageData) {
      this.cartList = JSON.parse(localStorageData);
    }
  }

  getInfo() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.dataUser = JSON.parse(userInfo);
    }
  }
  calculateCartSubtotal(): number {
    return this.cartList.reduce((total, item) => total + (item.subtotal || 0), 0);
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
}
