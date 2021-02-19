import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from './../../Shared/products.service';
import { Product } from './../../Shared/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  constructor(public service: ProductsService, private toastr:ToastrService) { }

  ngOnInit(): void {
    // if(this.service.formData ){

    // }
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Product();
  }

  onSubmit(form: NgForm) {
    var productID = this.service.formData.productId;
    this.service.formData.photoPath = "http://localhost:64360/" + this.service.response.dbPath;
    
    if (productID == 0) {
      // this.service.formData.productId = 8;
      console.log("Insert");
      this.insertRecord(form);
    }else{
      console.log("Update");
      this.updateRecord(form);
    }
  }
  
  insertRecord(form: NgForm) {
    this.service.PostProduct().subscribe(res =>
      {
        this.resetForm(form);
        this.toastr.success("Submmited Successfuly.!", "Product Register");
        this.service.GetProductList();
      },
      err => { console.log(err); }
    )
  }

  onUploadFinished(e : any){


  }
  updateRecord(form: NgForm) {
    this.service.putProduct().subscribe(
      res => {
        this.resetForm(form);
        this.service.GetProductList();
        this.toastr.info("Updated Successfuly.!", "Product Update");
      },
      err => {
        console.log(err);
      }
    )
  }
}
