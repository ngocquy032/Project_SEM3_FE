import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

@Injectable({
  providedIn: 'root'
}) export class OrdersService{
  constructor(private http: HttpClient){}
  private Url = 'https://arts-be1.azurewebsites.net/api/Orders';
  private UrlVnPay = 'https://arts-be1.azurewebsites.net/api/VnpayPayment'
  sendOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.Url, orderData);
  }

  orderVnPay(orderData1: any): Observable<any> {
    return this.http.post(this.UrlVnPay, orderData1, { responseType: 'text' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Xảy ra lỗi trên client-side
          console.error('An error occurred:', error.error.message);
        } else {
          // Xảy ra lỗi trên server-side
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Trả về một observable với giá trị rỗng hoặc thực hiện xử lý khác tùy thuộc vào yêu cầu của bạn
        return of(null);
      })
    );
  }


  getOrder(): Observable<any>{
    return this.http.get<any []>(this.Url)
  }

}
