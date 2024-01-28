import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/service/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: [
    './order.component.css',
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
export class OrderComponent implements OnInit {
  listOrder: any[] = []
  constructor(
    private orderService: OrdersService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(){
    this.orderService.getOrder().subscribe( order =>{
      this.listOrder = order
    })
  }

  orderDetails(orderId: number){
    this.router.navigate(['admin/orderDetails',orderId]);

  }

}
