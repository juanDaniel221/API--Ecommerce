import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl: string = 'https://young-sands-07814.herokuapp.com/api/categories';

  constructor(
    private http: HttpClient
  ) { }

  // Obtener las categorias desde la API
  getCategories() {
    return this.http.get<Category[]>(this.apiUrl)
  }
}
