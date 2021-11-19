import { identifierModuleUrl } from '@angular/compiler';
import { isNull, ReturnStatement } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos-lista/cursos.service';
@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<any> {

  constructor(private service: CursosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    console.log('entrei no guard');

  //  return of();
    return new Observable<Curso>()


 //   return of()
  //?
  }
}
