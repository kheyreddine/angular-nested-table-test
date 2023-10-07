import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject = new Subject<string>();

  setSearchValue(value: string) {
    this.searchSubject.next(value);
  }

  getSearchValue() {
    return this.searchSubject.asObservable();
  }
}
