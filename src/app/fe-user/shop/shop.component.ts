import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategorierService } from 'src/service/categories';
import { ProductService } from 'src/service/products';
import { FormGroup, FormControl } from '@angular/forms';
import { Options } from 'ngx-slider-v2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  selectedCategory: string | null = null;
  constructor(
    private categoriService: CategorierService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.getCategorie();
    this.getProduct();
  }

  getCategorie() {
    this.categoriService.getCategorie().subscribe(getCategori => {
      this.categories = getCategori;
    })
  }

  getProduct() {
    this.productService.getProduct().subscribe(product => {
      this.products = product;
      console.log('product',this.products);
    });
  }

  productDetails(productId: string): void{
    this.router.navigate(['/productDetails', productId]);
  }

  pageChanged(newPage: number) {
    this.currentPage = newPage;
  }

}
