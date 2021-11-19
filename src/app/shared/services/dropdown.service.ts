import { HttpClient,  HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade } from '../model/cidade';

import { EstadoBr } from '../model/estado-br';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpClient: HttpClient) { }

  getEstadosBr() {
    List: [] = []
   // return this.httpClient.get('assets/dados/estadobr.json')
   // .map((res: HttpResponse<EstadoBr[]>) =>  res.json());
       return this.httpClient.get<EstadoBr[]>('assets/dados/estadosbr.json');

  }

  getCidades(idEstado: number) {
    return this.httpClient.get<Cidade[]>('assets/dados/Cidades.json')
    .pipe(
      map((cidades:Cidade[]) => cidades.filter(c => c.estado == idEstado))

    )

  }

  getCargos() {

    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev. Jr'},
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev. Pl'},
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev. Sr'}

    ];
  }

  getTecnologias() {
    return [
      {nome:'java',   desc: 'Java'},
      {nome:'Delphi', desc: 'Delphi'},
      {nome:'javascript', desc: 'JavaScript'},
      {nome:'ruby', desc: 'Ruby'},


    ]
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Sim'},
      { valor: 'n', desc: 'Não'}
    ]
  }
}
