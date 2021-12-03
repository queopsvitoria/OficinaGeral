import { CrudService } from '../shared/crud-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ordem } from './ordem';
@Injectable({
  providedIn: 'root'
})
export class ServicosService extends CrudService<Ordem>{

  constructor(protected   http: HttpClient) {
    super(http, `${environment.API}ordem`) //'http://localhost:3000/cursos');
  }


}
