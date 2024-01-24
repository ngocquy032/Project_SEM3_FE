import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryModel } from "src/app/fe-admin/category-list/category.model";

@Injectable({
  providedIn: 'root'
}) export class CategorierService {
  constructor(
    private http: HttpClient
  ) { }
  private urlProduct =  "https://arts-be1.azurewebsites.net/api/Products"
  private UrlCategories = "https://arts-be1.azurewebsites.net/api/Categories";
  getCategorie(): Observable<any[]> {
    return this.http.get<any[]>(this.UrlCategories);
  }

  addCategorie(categoryData: CategoryModel): Observable<any[]> {
    return this.http.post<any[]>(this.UrlCategories, categoryData);
  }

  deleteCategory(categoryId: number): Observable<void> {
    const url = `${this.UrlCategories}/${categoryId}`; // Thay đường dẫn API xóa category

    return this.http.delete<void>(url);
  }


}
