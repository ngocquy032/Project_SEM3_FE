import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
}) export class ProductService {
  constructor(private http: HttpClient) { }
  private Url = 'https://arts-be1.azurewebsites.net/api/Products';
  private UrlImages = 'https://arts-be1.azurewebsites.net/api/ProductImages'
  getProduct(): Observable<any[]> {
    return this.http.get<any[]>(this.Url);
  }

  getImages():Observable<any[]>{
    return this.http.get<any[]>(this.UrlImages);
  }


}
