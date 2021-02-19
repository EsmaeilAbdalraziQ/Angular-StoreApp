import { Router } from '@angular/router';
import { ProductsService } from './../Shared/products.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { map } from 'rxjs/operators';
import { Product } from 'app/Shared/product.model';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnDestroy, OnInit  {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  productsList: Product[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  
  constructor(public service:ProductsService, private toastr:ToastrService, private rout:Router) { }

   ngOnInit(){
    this.dtOptions = { pagingType: 'full_numbers', pageLength: 2 };
    this.service.GetProductList();
    this.dtTrigger.next();
    // .subscribe(data=>{
    //   this.list = [];
    // })
  }

  populateForm(selectedRecord: Product){
    this.service.formData = Object.assign({}, selectedRecord);
    this.rout.navigate(['productsForm']);

  }

  onDelete(id:number) {
    if (confirm('Are you sure to delete this record ?')) 
    {
      this.service.deleteProduct(id)
        .subscribe(res => {
          this.service.GetProductList();
          this.toastr.error("Prodect Removed Successfuly", "Prodect Removed");
        },err =>
        {
          console.log(err);
        });
    }
  }
//#region Export As Excel File 
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }

  exportAsXLSX():void {
    if(confirm('Are sure want to Export')){
      this.exportAsExcelFile(this.service.list, 'Product_data');
    }
    false;
  }
  
//#endregion

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
   }
}
