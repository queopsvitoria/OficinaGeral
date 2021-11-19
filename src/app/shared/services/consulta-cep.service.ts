import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(
    private http: HttpClient

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
}
