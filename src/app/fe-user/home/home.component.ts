import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct().subscribe(product => {

      this.products = product.slice(0,8);
      console.log('getProduct: ', this.products);
    });
  }
}
