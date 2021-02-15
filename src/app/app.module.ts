import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { ProductListComponent } from './Product/product-list/product-list.component';
// import { AddProductComponent } from './Product/add-product/add-product.component';
// import { EditProductComponent } from './Product/edit-product/edit-product.component';
// import { DeleteProductComponent } from './Product/delete-product/delete-product.component';
// import { DetailsProductComponent } from './Product/details-product/details-product.component';

import {FormsModule} from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsFormComponent
    // ProductListComponent,
    // AddProductComponent,
    // EditProductComponent,
    // DeleteProductComponent,
    // DetailsProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
