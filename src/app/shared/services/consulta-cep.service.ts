import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CarrosService } from 'src/app/clientes/carros.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private serviceplaca: CarrosService,


  ) { }

  consultaCep(cep: string) {

    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      const URL: string =  `//viacep.com.br/ws/${cep}/json`;
      if(validacep.test(cep)) {
        return this.http.get(URL);
      }
    }

    return of({})
  }

  consultaPlaca1(placa: string) {
    console.log('Entrei aqui no negocio '+placa)
    this.route.params.subscribe(
      (params: any) => {
//const  placa = params['placa'];
        const  clienteplaca$ = this.serviceplaca.loadByplaca(placa);
        clienteplaca$.subscribe(ordemservico => {

          let nome = ordemservico;
          console.log (nome.modelo);
          console.log('encontrado o pacote -> ',ordemservico)
          return ordemservico

       //   this.updateForm(ordemservico);
          })
    //      console.log(clienteplaca$)

      }
    )

    return of({})
  }

}
