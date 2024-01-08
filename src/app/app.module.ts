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
import { ContactUsComponent } from './fe-user/contact-us/contact-us.component';
import { CheckOutComponent } from './fe-user/check-out/check-out.component';
import { ProductDetailsComponent } from './fe-user/product-details/product-details.component';
import { BlogComponent } from './fe-user/blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SigupComponent,
    MasterLayoutComponent,
    HomeComponent,
    AboutUsComponent,
    ShopComponent,
    ContactUsComponent,
    CheckOutComponent,
    ProductDetailsComponent,
    BlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
