import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'app/Shared/products.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public message:string;
  public progress:number;
  @Output() public onUploadFinished = new EventEmitter<any>();


  readonly baseURL = 'http://localhost:64360/api/upload';

  constructor(private http:HttpClient, public service: ProductsService) { }

  ngOnInit(): void {
  }

  public uploadFile = (files:any) =>{
    if (files.length === 0) {
      return;
    }

    let filToUpload = <File> files[0];
    // this.service.formData.
    const formData = new FormData();
    formData.append('file', filToUpload, filToUpload.name);

    this.http.post(this.baseURL, formData, {reportProgress:true, observe: 'events'}).subscribe(event => 
      {
          if (event.type == HttpEventType.UploadProgress) {
            // this.progress = Math.round(100 * event.loaded / event.total);
          }
          else if(event.type == HttpEventType.Response){
            this.message = 'Uploaded Success!';
            // this.onUploadFinished.emit(event.body);
            this.service.uploadFinished(event.body);
          }
      });

  }

  //---------------------


}
