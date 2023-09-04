import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories$ = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) {}

  getCategories(): Category[] {
    return this.categories$.getValue();
  }

  fetchCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${environment.apiUrl}category`)
      .pipe(tap((categories) => this.categories$.next(categories)));
  }
}
