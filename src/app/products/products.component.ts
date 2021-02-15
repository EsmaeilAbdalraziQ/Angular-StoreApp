import { ProductsService } from './../Shared/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'app/Shared/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit {

  constructor(public service:ProductsService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.GetProductList();
  }

  populateForm(selectedRecord: Product){
    this.service.formData = Object.assign({}, selectedRecord)
  }

  onDelete(id:number) {
    if (confirm('Are you sure to delete this record ?')) 
    {
      this.service.deleteProduct(id)
        .subscribe(res =>
        {
          this.service.GetProductList();
          this.toastr.error("Prodect Removed Successfuly", "Prodect Removed");
        },err =>
        {
          console.log(err);
        });
    }
  }

//#region Methods

  // DoGet(){
  //   // this.ApiService.DoGet().subscribe((res)=>{
  //     this.ApiService.DoGet().toPromise().then((res)=>{
  //     alert(`res: ${res}`);
  //   });
  // }

  // DoDelete(){
  //   this.ApiService.DoDelete().subscribe((res)=>{
  //     alert(`res: ${res}`);
  //   });
  // }

  // DoPost(){
  //   this.ApiService.DoPost().subscribe((res)=>{
  //     alert(`res: ${res}`);
  //   });
  // }

  // DoPut(){
  //   this.ApiService.DoPut().subscribe((res)=>{
  //     alert(`res: ${res}`);
  //   });
  // }
//#endregion

}
