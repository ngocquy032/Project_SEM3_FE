import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryModel } from "src/app/fe-admin/category-list/category.model";
import { ProductImage } from "src/app/fe-admin/product-images/product-images.model";
// import {  ProductItem } from "src/app/fe-admin/product-add/product-add.model";

@Injectable({
  providedIn: 'root'
}) export class ProductService {
  constructor(private http: HttpClient) { }
  private Url = 'https://arts-be1.azurewebsites.net/api/Products/productDTO';
  private urlProduct = 'https://arts-be1.azurewebsites.net/api/Products';
  private UrlCategories = "https://arts-be1.azurewebsites.net/api/Categories";
  private urlProductImages = 'https://arts-be1.azurewebsites.net/api/ProductImages'

  getProductDTO(): Observable<any[]> {
    return this.http.get<any[]>(this.Url);
  }

  getProductByIdDTO(productId: number): Observable<any> {
    const productUrl = `${this.Url}/${productId}`;
    return this.http.get<any>(productUrl);
  }
  addProduct(productData: any): Observable<any> {
    return this.http.post<any[]>(this.urlProduct, productData);
  }

   getProduct(): Observable<any[]> {
    return this.http.get<any[]>(this.urlProduct);
  }
  getProductById(productId: number): Observable<any> {
    const productUrl = `${this.urlProduct}/${productId}`;
    return this.http.get<any>(productUrl);
  }

  deleteProduct(productId: number): Observable<void> {
    const url = `${this.urlProduct}/${productId}`; // Thay đường dẫn API xóa category
    return this.http.delete<void>(url);
  }

  getCategoryById(categoryId: number): Observable<any> {
    const url = `${this.UrlCategories}/${categoryId}`;
    return this.http.get<any>(url);
  }

  getProductImages(product_id: number): Observable<any> {
    const productImagesUrl = `${this.urlProductImages}/${product_id}`;
    return this.http.get<any[]>(productImagesUrl);
  }

  addProductImage(productImage: ProductImage): Observable<ProductImage> {
    return this.http.post<ProductImage>(this.urlProductImages, productImage);
  }

}
