import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { OrderStatusModel } from "src/app/fe-admin/update-order/update-order.model";

@Injectable({
  providedIn: 'root'
}) export class OrdersService{
  constructor(private http: HttpClient){}
  private Url = 'https://arts-be1.azurewebsites.net/api/Orders';
// private UrlVnPay = 'https://arts-be1.azurewebsites.net/api/VnpayPayment';
  private UrlVnPay = 'https://localhost:7055/api/VnpayPayment';
  private UrlAdmin = 'https://arts-be1.azurewebsites.net/api/Orders/orderDTO';
  private urlOrderByIdUser = 'https://localhost:7055/api/Orders/getOrder'

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
    return this.http.get<any []>(this.UrlAdmin)
  }

  getOrderById(orderId: number): Observable<any> {
    const orderUrl = `${this.UrlAdmin}/${orderId}`;
    return this.http.get<any>(orderUrl);
  }

  getOrderStatusById(orderId: number): Observable<any> {
    const orderUrl = `${this.Url}/${orderId}`;
    return this.http.get<any>(orderUrl);
  }
  updateOrderStatus(orderInfo: OrderStatusModel): Observable<OrderStatusModel> {
    const url = `${this.Url}/${orderInfo.orderId}`;
    return this.http.put<OrderStatusModel>(url, orderInfo)
  }


  getOrdersByUserId(userId: number): Observable<any[]> {
    const url = `${this.urlOrderByIdUser}/${userId}`;
    return this.http.get<any[]>(url);
  }

}

