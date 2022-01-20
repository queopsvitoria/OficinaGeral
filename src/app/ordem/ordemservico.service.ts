import { CrudService } from '../shared/crud-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrdemServico } from './ordemservico';
@Injectable({
  providedIn: 'root'
})
export class OrdemServicosService extends CrudService<OrdemServico>{

  constructor(protected   http: HttpClient) {
    super(http, `${environment.API}ordemservico`) //'http://localhost:3000/cursos');
  }


}
