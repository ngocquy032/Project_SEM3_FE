import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newProducts: any[] = [];
  productSales: any[] = [];
  productBestSallers: any[] = [];
  productImages: any[] = [];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.getProduct();
    // this.getImages();
  }

  getProduct() {
    this.productService.getProduct().subscribe(product => {

      this.newProducts = product.slice(0,8);
      this.productSales = product.slice(18,26);
      this.productBestSallers = product.slice(9,17);
      console.log('newProducts: ', this.newProducts);
      console.log('productSales: ', this.productSales);
    });
  }

  getImages(){
    this.productService.getImages().subscribe( image => {
      this.productImages = image.slice(0,8);
      console.log('getImages', this.productImages);

    })
  }
}
