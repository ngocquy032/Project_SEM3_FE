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
  name: string = '';
  email: string = '';
  phone!: string;

  streetAddress: string = '';
  avatar: string = '';
  description: string = '';
  postcodeZip: string = '';
  level: string = '';
  country: string = '';
  town: string = '';
  district: string = '';
  lastName: string = '';
  firstName: string = '';
  password: string = '';
  blogComments: any[] = [];
  blogs: any[] = [];
  orders: any[] = [];

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
    this.userService.getUserById(userId).subscribe((data: UserModel) => {
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone ? data.phone.toString() : '';
      // Assign additional fields from UserModel
      this.streetAddress = data.streetAddress || '';
      this.avatar = data.avatar || '';
      this.description = data.description || '';
      this.postcodeZip = data.postcodeZip || '';
      this.level = data.level || '';
      this.country = data.country || '';
      this.town = data.town || '';
      this.district = data.district || '';
      this.lastName = data.lastName || '';
      this.firstName = data.firstName || '';
      this.password = data.password || '';
      this.blogComments = data.blogComments || [];
      this.blogs = data.blogs || [];
      this.orders = data.orders || [];
    });
  }


  Cancle() {
    this.router.navigate(['/admin/userList']);
  }

  Update(): void {
    const updatedUserData: UserModel = {
      userId: this.userId,
      name: this.name,
      email: this.email,
      phone: this.phone,
      // Assign additional fields from UserModel
      streetAddress: this.streetAddress,
      avatar: this.avatar,
      description: this.description,
      postcodeZip: this.postcodeZip,
      level: this.level,
      country: this.country,
      town: this.town,
      district: this.district,
      lastName: this.lastName,
      firstName: this.firstName,
      password: this.password,
      blogComments: this.blogComments,
      blogs: this.blogs,
      orders: this.orders
    };
    if(confirm('are you want to update?')){

      this.userService.updateUser(updatedUserData).subscribe(
        (data: any) => {
          alert('User updated successfully!');
          this.router.navigate(['/admin/userList']);
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle error
        }
      );
    }
  }
}
