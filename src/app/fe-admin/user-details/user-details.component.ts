import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/service/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css',
    '../../../assets/admin/vendor/fonts/boxicons.css',
    '../../../assets/admin/vendor/fonts/fontawesome.css',
    '../../../assets/admin/vendor/fonts/flag-icons.css',
    '../../../assets/admin/css/demo.css',
    '../../../assets/admin/vendor/css/rtl/core.css',
    '../../../assets/admin/vendor/css/rtl/theme-default.css',
    '../../../assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',
    '../../../assets/admin/vendor/libs/typeahead-js/typeahead.css',
    '../../../assets/admin/vendor/libs/datatables-bs5/datatables.bootstrap5.css',
    '../../../assets/admin/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css',
    '../../../assets/admin/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css',
    '../../../assets/admin/vendor/libs/select2/select2.css',
    '../../../assets/admin/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.css',
    '../../../assets/admin/vendor/libs/sweetalert2/sweetalert2.css',
    '../../../assets/admin/vendor/libs/@form-validation/umd/styles/index.min.css'
  ]
})
export class UserDetailsComponent implements OnInit {
  userData: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.getUserDetails(userId);
    });
  }
  getUserDetails(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (data: any) => {
        this.userData = data;
        console.log('orderData', this.userData);
      },
      error => {
        console.log('Error loading order details:', error);
      }
    )
  }
  update(userId: number){
    this.router.navigate(['/admin/editUser',userId ])
  }
  cancle(){
    this.router.navigate(['/admin/userList'])
  }

}
