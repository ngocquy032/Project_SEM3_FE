import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/service/user';

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
    '../../../assets/admin/vendor/libs/@form-validation/umd/styles/index.min.css'
  ]
})
export class UserListComponent implements OnInit {
  userList: any[] = [];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
    this.userService.getUserData().subscribe(users => {
      this.userList = users;
    });
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

}
