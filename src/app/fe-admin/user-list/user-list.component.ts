import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/service/user';
import { AddUserModel } from './user-list.model';
import { window } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [
    './user-list.component.css',
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
export class UserListComponent implements OnInit {
  userList: any[] = [];
  userForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',Validators.required],
      password: ['', Validators.required],
      level: ['user', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUser();

  }
  getUser() {
    this.userService.getUserData().subscribe(users => {
      this.userList = users;
    });
  }
  userDetails(userId: number){
    this.router.navigate(['/admin/userDetails', userId])
  }

  addUser(): void {
    if (this.userForm.valid) {
      const newUser: AddUserModel = this.userForm.value;

      console.log('newUser', newUser);

      this.userService.addUser(newUser).subscribe(
        (response) => {
          console.log('response', response);

          this.userForm.reset();
          alert('Successful added, please to continue.');
          // this.router.navigate(['admin/userList']);
          location.reload();
        },
        (error) => {
          console.error('Lỗi đăng ký', error);
        }
      )

    }
  }

  deteteUser( userId: number){
    if (confirm('Are you sure you want to delete')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.getUser();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  updateUser(userId: number): void {
    this.router.navigate(['/admin/editUser', userId]);
  }
}
