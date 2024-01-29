import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserInfo } from 'src/service/auth.service';
import { UserService } from 'src/service/user';
import { LoginModel } from '../users/log-in/login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/service/order';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isAuthenticated: boolean = false;
  userData: any = {};
  orders: any[] = [];
  // userInfo: UserInfo | null = null;
  passwordChangeForm: FormGroup;

  userInfo: any;
  constructor(

    private ordersService: OrdersService,
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private orderService: OrdersService


  ) {
    this.passwordChangeForm = FormBuilder.group({
      current_pwd: ['', Validators.required],
      new_pwd: ['', Validators.required],
      confirm_pwd: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getUserInformation();
    this.getOrders();
  }
  getOrders() {
    const userInfo = this.authService.getUserInfo();

  if (userInfo && userInfo.userId) {
    this.ordersService.getOrdersByUserId(userInfo.userId).subscribe(
      (data: any[]) => {
        this.orders = data;
        console.log('orders', this.orders);
        
      },
      (error) => {
        console.error('Error fetching user orders', error);
      }
    );
  } else {
    this.router.navigate(['/']);
  }
  }

  getUserInformation(): void {
    // Giả sử AuthService của bạn có một phương thức để lấy thông tin người dùng
    this.userInfo = this.authService.getUserInfo();
  }

  logOut(): void {
    const confirmLogout = confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      this.authService.logout();
      this.router.navigate(['']);
      localStorage.removeItem('wishlist');
      localStorage.removeItem('cart');
    }
  }

  // ----orderUserAcount
  // getOrders() {
  //   const userId = localStorage.getItem('userId');
  //   if (userId) {
  //     this.ordersService.getOrdersByUserId(parseInt(userId, 10)).subscribe(
  //       (data: any[]) => {
  //         this.orders = data;
  //       },
  //       (error) => {
  //         console.error('Error fetching user orders', error);
  //       }
  //     );
  //   }
  // }

  // getOrders() {
  //   const userIdFromUrl = this.activatedRoute.snapshot.paramMap.get('userId');
  //   const userIdFromStorage = localStorage.getItem('userId');

  //   // Kiểm tra xem userId từ URL và từ local storage có giống nhau không
  //   // Sử dụng toán tử ba ngôi để kiểm tra và thực hiện phương thức
  //   userIdFromUrl && userIdFromStorage && userIdFromUrl === userIdFromStorage
  //     ? this.ordersService.getOrdersByUserId(parseInt(userIdFromUrl, 10)).subscribe(
  //       (data: any[]) => {
  //         this.orders = data;
  //       },
  //       (error) => {
  //         console.error('Error fetching user orders', error);
  //       }
  //     )

  //     : this.router.navigate(['/']);

  // }
}
