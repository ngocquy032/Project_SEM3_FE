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
    const url = `${this.UrlCategories}/${categoryId}`;
    return this.http.delete<void>(url);
  }

  updateCategory(categoryItem: CategoryModel): Observable<CategoryModel> {
    const url = `${this.UrlCategories}/${categoryItem.categoryId}`;
    return this.http.put<CategoryModel>(url, categoryItem);
  }

  getCategoryById(categoryId: number): Observable<CategoryModel> {
    const url = `${this.UrlCategories}/${categoryId}`;
    return this.http.get<CategoryModel>(url);
  }
}
