import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
}) export class CategorierService {
  constructor(
    private http: HttpClient
  ) { }
  private UrlCategories = "https://arts-be1.azurewebsites.net/api/Categories";
  getCategorie(): Observable<any[]> {
    return this.http.get<any[]>(this.UrlCategories);
  }
  getProductById(productId: string): Observable<any> {
    const productUrl = `${this.UrlCategories}/${productId}`;
    return this.http.get<any>(productUrl);
  }

}
