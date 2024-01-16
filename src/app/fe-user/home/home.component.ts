import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private productService: ProductService,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.getProduct();
    this.getImages();
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
    this.productService.getImagetProductImagesges().subscribe( productImage =>{
      this.productImages = productImage;
    });
  }

  productDetails(productId: string): void{
    this.router.navigate(['/productDetails', productId]);
  }

}
