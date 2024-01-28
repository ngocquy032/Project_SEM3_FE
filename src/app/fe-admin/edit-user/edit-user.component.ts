import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user-list/user.model';
import { UserService } from 'src/service/user';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: [
    './edit-user.component.css',
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
export class EditUserComponent implements OnInit {
  userId!: number;
  userName: string = '';
  userEmail: string = '';
  userPhone!: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.getUser(this.userId);
    });
  }
  getUser(userId: number): void {
    this.userService.getUserById(userId).subscribe((data: any) => {
      this.userName = data.name;
      this.userEmail = data.email;
      this.userPhone = data.phone;
      // console.log('data', data);
    });

  }
  Cancle(){
    this.router.navigate(['/admin/userList']);
  }

  Update(): void {

    const data: UserModel = {
      userId: this.userId,
      name: this.userName,
      email: this.userEmail,
      phone: this.userPhone
    };
    if(confirm('Are you sure you want to edit? ')) {
      this.userService.updateUser(data).subscribe(
        (datasuccess: any)=>{
          alert('User updated successfully!');
          this.router.navigate(['/admin/userList']);
        }
      )
    }
  }
}
