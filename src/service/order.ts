import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
}) export class OrdersService{
  constructor(private http: HttpClient){}
  private Url = 'https://arts-be1.azurewebsites.net/api/Orders';
  sendOrder(order: any): Observable<any> {
    return this.http.post<any>(this.Url, order);
  }
}
