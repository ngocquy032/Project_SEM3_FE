import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchQuery = new BehaviorSubject<string>('');
  setSearchQuery(query: string): void {
    this.searchQuery.next(query);
  }

  getSearchQuery(): BehaviorSubject<string> {
    return this.searchQuery;
  }
}
