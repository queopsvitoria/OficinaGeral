import { CrudService } from '../shared/crud-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Servico } from './servico';
@Injectable({
  providedIn: 'root'
})
export class ServicosService extends CrudService<Servico>{

  constructor(protected   http: HttpClient) {
    super(http, `${environment.API}servicos`) //'http://localhost:3000/cursos');
  }


}
