import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: [
  '../../../assets/admin/vendor/fonts/boxicons.css',
  '../../../assets/admin/vendor/fonts/fontawesome.css',
  '../../../assets/admin/vendor/fonts/flag-icons.css',
  '../../../assets/admin/vendor/css/rtl/core.css',
  '../../../assets/admin/vendor/css/rtl/theme-default.css',
  '../../../assets/admin/css/demo.css',
  '../../../assets/admin/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',
  '../../../assets/admin/vendor/libs/typeahead-js/typeahead.css',
  '../../../assets/admin/vendor/libs/apex-charts/apex-charts.css',
  '../../../assets/admin/vendor/css/pages/card-analytics.css',
  './layout-admin.component.css',
]
})
export class LayoutAdminComponent {
  isProductsMenuOpen = false;
  toggleProductsMenu() {
    this.isProductsMenuOpen = !this.isProductsMenuOpen;
  }
  isOrderMenuOpen = false;
  toggleOrderMenu() {
    this.isOrderMenuOpen = !this.isOrderMenuOpen;
  }
  isCustomersMenuOpen = false;
  toggleCustomersMenu() {
    this.isCustomersMenuOpen = !this.isCustomersMenuOpen;
  }
  isNavbarVisible = true;

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  isSearchVisible = false;

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }
}
