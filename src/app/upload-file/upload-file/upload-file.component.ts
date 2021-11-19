import { environment } from 'src/environments/environment';
import { UploadFileService } from './../upload-file.service';
import { Component, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse } from 'src/app/shared/rxjs.operator';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;
  progress: number = 0;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {

  }

  onChange(event: any) {
    console.log(event);

    const selectFiles = <FileList>event.srcElement.files;
    //document.getElementById('customFileLabel')?.innerHTML = selectFiles[0].name;

    const filesName = [];
    this.files = new Set();
    for (let i = 0; i < selectFiles.length; i++) {
      filesName.push(selectFiles[i].name);
      this.files.add(selectFiles[i]);

    }
  //  document.getElementById('customFileLabel')?.innerHTML = fileNames.join(', ');
  this.progress = 0;

  }

  onUpload() {
    if (this.files && this.files.size > 0) {

        this.service.upload(this.files, '/api/upload') // enviroment.BASE_URL+'/upload'
      //  .pipe(
        // uploadProgress(progress => {
        // console.log(progress);
        // this.progress = progress;
       // })
    //      filterResponse()
     //   )
        .subscribe((event: HttpEvent<Object>) => {
          console.log(event);
          if(event.type === HttpEventType.Response){
            console.log('Upload Concluido');
          }
          else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total!);
            console.log('progresso', percentDone);
            this.progress= percentDone;
          }
        })
    }

  }
  onDowloadExcel() {
    this.service.download(environment.BASE_URL+'/dowloadExcel')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'xxx.xslx')

      })
  }


  onDowloadPDF() {
    this.service.download(environment.BASE_URL+'/dowloadPDF')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'xxx.pdf')

      })
  }
}
