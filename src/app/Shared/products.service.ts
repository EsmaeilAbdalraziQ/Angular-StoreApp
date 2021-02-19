import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import * as EventEmitter from 'events';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  formData: Product= new Product();
  readonly baseURL = 'http://localhost:64360/api/products';
  list: Product[] = [];

  public response: {dbPath: ''};
  
  constructor(private http: HttpClient) { 
      // Populating usersArray with names from API
    this.http.get<any>(this.baseURL).subscribe(data => {
        data.forEach((ele: { productName: Product; }) => { this.list.push(ele.productName)});
    });
  }




  GetProductList() {
    this.http.get(this.baseURL).toPromise().then(res =>
      this.list = res as Product[]
      // this.http.get(this.baseURL).subscribe(data =>{
      //this.list = (data as any).data;
      );
    // return this.http.get(this.baseURL);
  }

  PostProduct() {
    // console.log( JSON.stringify(this.formData));
    return this.http.post(this.baseURL, this.formData);
  }

  putProduct() {
    return this.http.put(`${this.baseURL}/${this.formData.productId}`, this.formData);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  public uploadFinished = (event:any) => {
    console.log(event);
    this.response = event;
  }

  public createImgPath  (serverPath: string) {
    return `https://localhost:64360/${serverPath}`;
  }

  
}
