import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/search.service';
import { ProductService } from 'src/service/products';


@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent {
  searchProduct: string = '';
  filteredProducts: any[] = [];
  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }
  [x: string]: any;
  searchByName(): void {
    this.searchService.setSearchQuery(this.searchProduct);

    // Chuyển hướng đến trang shop với query parameter 'search'
    //  this.router.navigate(['/shop']);
  }
}
