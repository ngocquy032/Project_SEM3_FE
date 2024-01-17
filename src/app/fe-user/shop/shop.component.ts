import { Component, ElementRef, ViewChild, Renderer2, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategorierService } from 'src/service/categories';
import { ProductService } from 'src/service/products';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  constructor(
    private categoriService: CategorierService,
    private productService: ProductService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.getCategorie();
    this.getProduct();
  }

  getCategorie() {
    this.categoriService.getCategorie().subscribe(getCategori => {
      this.categories = getCategori;
      console.log('categori', this.categories);

    })
  }

  getProduct() {
    this.productService.getProduct().subscribe(product => {
      this.products = product.splice(0,12);
      console.log('product',this.products);

    });
  }

  productDetails(productId: string): void{
    this.router.navigate(['/productDetails', productId]);
  }


}
