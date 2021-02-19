import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { ProductListComponent } from './Product/product-list/product-list.component';

import {FormsModule} from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import {HttpClientModule} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UploadComponent } from './products/upload/upload.component';
import { DataTablesModule } from "angular-datatables";
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsFormComponent,
    UploadComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot()
      // timeOut:7000, positionClass:'toast-top-right', preventDuplicates:true, 
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
