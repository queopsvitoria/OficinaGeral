import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clientes } from '../clientes';
import { tap, delay, take } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import {  Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = `${environment.API}clientes` //'http://localhost:3000/cursos';

  curso$!:Observable<Clientes[]> ;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Clientes[]>(this.API)
    .pipe(
      delay(50),
      tap(console.log)
    );

  }

  private update(clientes: any) {
    return this.http.put(`${this.API}/${clientes.id}`, clientes).pipe(take(1));
  }

  private create(clientes: any) {
    return this.http.post(this.API, clientes).pipe(take(1));
  }

  loadById(id: any) {
    return this.http.get<Clientes>(`${this.API}/${id}`).pipe(take(1));

  }

  save(clientes: any) {
    if (clientes.id) {
      return this.update(clientes);
    }
    return this.create(clientes);
  }

  remove(id: any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));


  }
}
