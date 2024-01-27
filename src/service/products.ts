import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
// import {  ProductItem } from "src/app/fe-admin/product-add/product-add.model";

@Injectable({
  providedIn: 'root'
}) export class ProductService {
  constructor(private http: HttpClient) { }
  private Url = 'https://arts-be1.azurewebsites.net/api/Products';
  private urlAdd = 'https://localhost:7055/api/Products'

  getProduct(): Observable<any[]> {
    return this.http.get<any[]>(this.Url);
  }
  getProductById(productId: string): Observable<any> {
    const productUrl = `${this.Url}/${productId}`;
    return this.http.get<any>(productUrl);
  }
  addProduct(productData: any): Observable<any> {
    return this.http.post<any[]>(this.urlAdd, productData);
  }

}
