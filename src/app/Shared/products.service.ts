import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor(private http: HttpClient) { }

  formData: Product= new Product();
  readonly baseURL = 'http://localhost:64360/api/products';
  list : Product[];


  PostProduct() {
    return this.http.post(this.baseURL, this.formData);
  }

  putProduct() {
    return this.http.put(`${this.baseURL}/${this.formData.ProductId}`, this.formData);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  GetProductList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Product[]);
  }
}
