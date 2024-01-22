// blog.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://arts-be1.azurewebsites.net/api/Blogs';

  constructor(private http: HttpClient) {}

  getBlog(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
