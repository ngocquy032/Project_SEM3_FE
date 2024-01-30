import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/search.service';
import { AuthService } from 'src/service/auth.service';
import { ProductService } from 'src/service/products';


@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent{
  [x: string]: any;
  wishList: any[] = [];


  searchProduct: string = '';
  filteredProducts: any[] = [];
  constructor(
    private searchService: SearchService,
    private router: Router,
    private authService: AuthService
  ) { }

  searchByName(): void {
    this.searchService.setSearchQuery(this.searchProduct);

    // Chuyển hướng đến trang shop với query parameter 'search'
    //  this.router.navigate(['/shop']);
  }

  account(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/account'])
    }else{
      alert('You are not logged in, please log in to continue');
      this.router.navigate(['/login']);
    }
  }

  shop(){
    this.router.navigate(['/shop']);
  }
}
