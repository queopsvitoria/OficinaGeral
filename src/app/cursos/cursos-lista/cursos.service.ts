import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../curso';
import { tap, delay, take } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import {  Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos` //'http://localhost:3000/cursos';

  curso$!:Observable<Curso[]> ;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(50),
      tap(console.log)
    );

  }

  private update(curso: any) {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  private create(curso: any) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  loadById(id: any) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));

  }

  save(curso: any) {
    if (curso.id) {
      return this.update(curso);
    }
    return this.create(curso);
  }

  remove(id: any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));


  }
}
