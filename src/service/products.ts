import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
// import {  ProductItem } from "src/app/fe-admin/product-add/product-add.model";

@Injectable({
  providedIn: 'root'
}) export class ProductService {
  constructor(private http: HttpClient) { }
  private Url = 'https://arts-be1.azurewebsites.net/api/Products/productDTO';
  private urlProduct = 'https://arts-be1.azurewebsites.net/api/Products'

  getProduct(): Observable<any[]> {
    return this.http.get<any[]>(this.urlProduct);
  }
  getProductById(productId: string): Observable<any> {
    const productUrl = `${this.urlProduct}/${productId}`;
    return this.http.get<any>(productUrl);
  }
  addProduct(productData: any): Observable<any> {
    return this.http.post<any[]>(this.urlProduct, productData);
  }

  deleteProduct(productId: number): Observable<void> {
    const url = `${this.urlProduct}/${productId}`; // Thay đường dẫn API xóa category
    return this.http.delete<void>(url);
  }

}
