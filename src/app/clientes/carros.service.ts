import { CrudService } from '../shared/crud-service';
import { Injectable } from '@angular/core';
import { Carros } from './carro';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrosService extends CrudService<Carros>{

  constructor(protected   http: HttpClient) {
    super(http, `${environment.API}carros`) //'http://localhost:3000/clientes');
  }


}
