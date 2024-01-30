import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/service/order';
import { OrderStatusModel } from './update-order.model';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css',
    '../../../assets/admin/vendor/css/rtl/core.css',
    '../../../assets/admin/vendor/css/rtl/theme-default.css',
    '../../../assets/admin/vendor/fonts/boxicons.css',
    '../../../assets/admin/vendor/fonts/fontawesome.css',
    '../../../assets/admin/vendor/fonts/flag-icons.css',
    '../../../assets/admin/css/demo.css',
    '../../../assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',
    '../../../assets/admin/vendor/libs/typeahead-js/typeahead.css',
    '../../../assets/admin/vendor/libs/datatables-bs5/datatables.bootstrap5.css',
    '../../../assets/admin/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css',
    '../../../assets/admin/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css',
    '../../../assets/admin/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.css',
    '../../../assets/admin/vendor/libs/sweetalert2/sweetalert2.css',
    '../../../assets/admin/vendor/libs/@form-validation/umd/styles/index.min.css',
    '../../../assets/admin/vendor/libs/select2/select2.css'
  ]
})
export class UpdateOrderComponent implements OnInit {
  userId!: number;
  firstName: string = '';
  lastName: string = '';
  streetAdress?: string = '';
  email: string = '';
  phone: string = '';
  paymentType: string = '';
  country: string = '';
  town: string = '';
  notes: string = '';
  district: string = '';
  amount!: number;
  ordersDetails: any[] = [];
  user: any = [];
  orderStatus: string = '';
  orderSuccess: string = 'Confirm';
  orderWating: string = 'Waiting for confirmation'
  selectedOrderStatus: string = '';
  orderId!: number;
  constructor(
    private router: Router,
    private orderService: OrdersService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      this.getOrderById(this.orderId);
    });
  }

  getOrderById(orderId: number) {
    this.orderService.getOrderStatusById(orderId).subscribe(data => {
      this.userId = data.userId;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.streetAdress = data.streetAdress;
      this.email = data.email;
      this.phone = data.phone;
      this.paymentType = data.paymentType;
      this.country = data.country;
      this.town = data.town;
      this.notes = data.notes;
      this.district = data.district;
      this.orderStatus = data.orderStatus;
      this.selectedOrderStatus = data.orderStatus;
      this.amount = data.amount;
      this.ordersDetails = data.ordersDetails;
      this.user = data.user;
    })
  }


  update() {
    const updateOrderStatus: OrderStatusModel = {
      orderId: this.orderId,
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      streetAdress: this.streetAdress,
      email: this.email,
      phone: this.phone,
      paymentType: this.paymentType,
      country: this.country,
      town: this.town,
      notes: this.notes,
      district: this.district,
      orderStatus: this.selectedOrderStatus,
      amount: this.amount,
      ordersDetails: this.ordersDetails,
      user: this.user
      // orderId: this.orderId, orderStatus: this.selectedOrderStatus
    }
    console.log('data', updateOrderStatus);
    if (confirm('Are you sure want to update?')) {
      this.orderService.updateOrderStatus(updateOrderStatus).subscribe(
        (data: any) => {
          console.log('dataUpdate', data);

          alert('Order updated successfully!');
          this.router.navigate(['/admin/order']);

        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle error
        }
      )
    }


    console.log('Selected Order Status:', this.selectedOrderStatus);

  }

  Cancle() {
    this.router.navigate(['/admin/order'])
  }

}
