import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './fe-user/users/log-in/log-in.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SigupComponent } from './fe-user/users/sigup/sigup.component';
import { MasterLayoutComponent } from './fe-user/master-layout/master-layout.component';
import { HomeComponent } from './fe-user/home/home.component';
import { AboutUsComponent } from './fe-user/about-us/about-us.component';
import { ShopComponent } from './fe-user/shop/shop.component';
import { WishiftComponent } from './fe-user/wishift/wishift.component';
import { ContactUsComponent } from './fe-user/contact-us/contact-us.component';
import { CheckOutComponent } from './fe-user/check-out/check-out.component';
import { ProductDetailsComponent } from './fe-user/product-details/product-details.component';
import { BlogComponent } from './fe-user/blog/blog.component';
import { AccountComponent } from './fe-user/account/account.component';
import { ShoppingCartComponent } from './fe-user/shopping-cart/shopping-cart.component';
import { LayoutAdminComponent } from './fe-admin/layout-admin/layout-admin.component';
import { ProductListComponent } from './fe-admin/product-list/product-list.component';
import { ProductAddComponent } from './fe-admin/product-add/product-add.component';

import { BlogDetailsComponent } from './fe-user/blog-details/blog-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSliderModule } from 'ngx-slider-v2';
import { LoginAdminComponent } from './fe-admin/login-admin/login-admin.component';
import { CategoryListComponent } from './fe-admin/category-list/category-list.component';
import { UpdateCategoryComponent } from './fe-admin/update-category/update-category.component';
import { OrderComponent } from './fe-admin/order/order.component';
import { OrderDetailsComponent } from './fe-admin/order-details/order-details.component';
import { UserListComponent } from './fe-admin/user-list/user-list.component';
import { EditUserComponent } from './fe-admin/edit-user/edit-user.component';
import { ProductViewComponent } from './fe-admin/product-view/product-view.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SigupComponent,
    MasterLayoutComponent,
    HomeComponent,
    AboutUsComponent,
    ShopComponent,
    WishiftComponent,
    ShoppingCartComponent,
    ContactUsComponent,
    CheckOutComponent,
    ProductDetailsComponent,
    BlogComponent,
    AccountComponent,
    BlogComponent,
    LayoutAdminComponent,
    ProductListComponent,
    BlogDetailsComponent,
    ProductAddComponent,
    LoginAdminComponent,
    CategoryListComponent,
    UpdateCategoryComponent,
    OrderComponent,
    OrderDetailsComponent,
    UserListComponent,
    EditUserComponent,
    ProductViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
