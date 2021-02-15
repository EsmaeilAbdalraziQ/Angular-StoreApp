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
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new Product();
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.ProductId == 0) {
      this.insertRecord(form);
    }else{
      this.updateRecord(form);
    }
  }
  
  insertRecord(form: NgForm) {
    this.service.PostProduct().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("Submmited Successfuly.!", "Product Register");
        this.service.GetProductList();
      },
      err => { console.log(err); }
    )
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
