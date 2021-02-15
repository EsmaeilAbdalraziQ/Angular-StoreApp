import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';

// import {ProductListComponent} from './Product/product-list/product-list.component';
// import {DetailsProductComponent} from './Product/details-product/details-product.component';
// import {AddProductComponent} from './Product/add-product/add-product.component';
// import {EditProductComponent} from './Product/edit-product/edit-product.component';
// import {DeleteProductComponent} from './Product/delete-product/delete-product.component';


const routes: Routes = [
  {path:'', redirectTo:'products', pathMatch:'full'},
  {path:'products', component: ProductsComponent},
  {path:'create', component:ProductsFormComponent}

  // {path:'products/:id', component: DetailsProductComponent},
  // {path:'products/:id', component: EditProductComponent},
  // {path:'create', component:AddProductComponent},
  // {path:'delete', component:DeleteProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
