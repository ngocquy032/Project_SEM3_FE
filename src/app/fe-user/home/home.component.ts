import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/service/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
[x: string]: any;
  newProducts: any[] = [];
  productSales: any[] = [];
  productBestSallers: any[] = [];
  productImages: any[] = [];
  Wishift : any[] = [];
  constructor(
    private productService: ProductService,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct().subscribe(product => {
      this.newProducts = product.slice(0,8);
      this.productSales = product.slice(18,26);
      this.productBestSallers = product.slice(9,17);

    });
  }

  productDetails(productId: string): void{
    this.router.navigate(['/productDetails', productId]);
  }
  addWishift(product: any) {
    if (!product || !product.productId) {
      console.error('Product không hợp lệ!', product);
      let a = this.Wishift.push({
        product_id: product.productId,
        price: product.price,
        title: product.title,
        path: product.path
      });
      console.log('a',a)
    }

    // Thêm sản phẩm vào danh sách mong muốn
    
    // Lưu danh sách mong muốn đã cập nhật trở lại LocalStorage
    localStorage.setItem('wishlist', JSON.stringify(this.Wishift));
    console.log('Sản phẩm được thêm vào mong muốn:', product.title);
  }
  }