import { CrudService } from '../shared/crud-service';
import { Injectable } from '@angular/core';
import { Clientes } from './clientes';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Clientes>{

  constructor(protected   http: HttpClient) {
    super(http, `${environment.API}clientes`) //'http://localhost:3000/clientes');
  }


}
