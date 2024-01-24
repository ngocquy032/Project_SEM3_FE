import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './fe-user/users/log-in/log-in.component';
import { SigupComponent } from './fe-user/users/sigup/sigup.component';
import { MasterLayoutComponent } from './fe-user/master-layout/master-layout.component';
import { HomeComponent } from './fe-user/home/home.component';
import { AboutUsComponent } from './fe-user/about-us/about-us.component';
import { ShopComponent } from './fe-user/shop/shop.component';
import { WishiftComponent } from './fe-user/wishift/wishift.component';
import { ShoppingCartComponent } from './fe-user/shopping-cart/shopping-cart.component';
import { ContactUsComponent } from './fe-user/contact-us/contact-us.component';
import { CheckOutComponent } from './fe-user/check-out/check-out.component';
import { ProductDetailsComponent } from './fe-user/product-details/product-details.component';
import { BlogComponent } from './fe-user/blog/blog.component';
import { AccountComponent } from './fe-user/account/account.component';
import { LayoutAdminComponent } from './fe-admin/layout-admin/layout-admin.component';
import { ProductListComponent } from './fe-admin/product-list/product-list.component';
import { BlogDetailsComponent } from './fe-user/blog-details/blog-details.component';
import { ProductAddComponent } from './fe-admin/product-add/product-add.component';
import { LoginAdminComponent } from './fe-admin/login-admin/login-admin.component';
import { AuthService } from 'src/service/auth.service';
import { AuthAdminService } from 'src/service/authAdmin.service';
import { CategoryListComponent } from './fe-admin/category-list/category-list.component';
const routes: Routes = [
  {
    path: '', component: MasterLayoutComponent,
    children: [
      //layout component trong day
      {
        path: '', component: HomeComponent
      }, {
        path: 'aboutUs', component: AboutUsComponent
      },
      {
        path: 'shop', component: ShopComponent
      },
      {
        path: 'wishift', component: WishiftComponent
      },
      {
        path: 'shoppingCart', component: ShoppingCartComponent
      },
      {
        path: 'contactUs', component: ContactUsComponent
      },
      {
        path: 'checkOut', component: CheckOutComponent
      },
      {
        path: 'productDetails/:id', component: ProductDetailsComponent
      },
      {
        path: 'blog', component: BlogComponent
      },
      {
        path: 'account', component: AccountComponent
      },
      {
        path: 'login', component: LogInComponent
      },
      {
        path: 'register', component: SigupComponent
      },
      {
        path: 'blog-details', component: BlogDetailsComponent
      }

    ]
  },

  // router admin
  {
    path: 'admin', component: LayoutAdminComponent, canActivate: [AuthAdminService],
    children: [
      {
          path: 'productList', component: ProductListComponent, pathMatch: 'full'
      },
      {
        path: 'productAdd', component: ProductAddComponent
      },
      {
        path: 'categoryList', component: CategoryListComponent
      }
    ]
  },
  {
    path: 'loginAdmin', component: LoginAdminComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
