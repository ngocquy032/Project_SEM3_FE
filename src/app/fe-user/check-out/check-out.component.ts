import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  items: any[] = [];
  notes: string = '';
  orderForm: FormGroup;
  discountAmount: number = 0;
  paymentSuccess = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private orderService: OrdersService,
    private router: Router
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

    if (this.calculateCartTotal() === 0) {
      alert('There are no products to purchase, please add products to cart');
      this.router.navigate(['/shop']);

    } else {
      if (this.selectedMethod != 'vnpay') {

        console.log('Cash Payment');
        let totalAmount = 0;
        for (const item of this.cartList) {
          totalAmount += item.subtotal;

        }

        const orderData = {
          firstName: this.dataUser.firstName,
          lastName: this.dataUser.lastName,
          userID: this.dataUser.userId,
          address: this.dataUser.streetAddress,
          email: this.dataUser.email,
          phone: this.dataUser.phone,
          amount: totalAmount,
          orderDescription: 'aaaa',
          orderType: 'Cash',
          country: this.dataUser.country,
          town: this.dataUser.town,
          notes: this.notes,
          district: this.dataUser.district,
          orderDetails: this.cartList.map(item => ({
            productId: item.productId,
            title: item.productCart.title,
            quantity: item.quantity,
            price: item.productCart.price,
            originPrice: item.productCart.price,
            total: item.subtotal
          })),
          // totalAmount: this.calculateCartTotal(),

        };

        this.orderService.sendOrder(orderData).subscribe(
          respone => {
            console.log('respone', respone);
            this.router.navigate(['']);
            alert('Successful payment and waiting for confirmation');
            localStorage.removeItem('cart');


          }, error => {
            console.error('Error adding category', error);
          });

        console.log(orderData);

      } else {
        console.log('vnpay');

        let totalAmount = 0;
        for (const item of this.cartList) {
          totalAmount += item.subtotal;
        }
        const orderData = {
          firstName: this.dataUser.firstName,
          lastName: this.dataUser.lastName,
          userID: this.dataUser.userId,
          address: this.dataUser.streetAddress,
          email: this.dataUser.email,
          phone: this.dataUser.phone,
          amount: totalAmount * 24000,
          orderDescription: 'aaaa',
          orderType: 'Vnpay',
          country: this.dataUser.country,
          town: this.dataUser.town,
          notes: this.notes,
          district: this.dataUser.district,
          orderDetails: this.cartList.map(item => ({
            productId: item.productId,
            title: item.productCart.title,
            quantity: item.quantity,
            price: item.productCart.price,
            originPrice: item.productCart.price,
            total: item.subtotal
          })),
          // totalAmount: this.calculateCartTotal() * 23000,

        };
        this.orderService.orderVnPay(orderData).subscribe(
          response => {
            // Kiểm tra nếu phản hồi không phải là một đối tượng JSON
            if (typeof response !== 'object' || response === null) {
              console.log('Response is not a valid JSON:', response);
              window.location.href = response;
              localStorage.removeItem('cart');
            }
            // Nếu phản hồi là một đối tượng JSON, bạn có thể console.log nó hoặc xử lý theo cách khác tùy thuộc vào nhu cầu của bạn
            console.log('Parsed JSON:', response);
          },
          error => {
            console.error('Error:', error);
          }
        );
        console.log(orderData);
      }
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
