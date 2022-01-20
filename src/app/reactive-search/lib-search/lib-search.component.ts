import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.css'],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL =   'http://localhost:3000/servicos'; //'https://api.cdnjs.com/libraries';
  results1$: Observable<any> | undefined;
  result : [] =[]

  total: number = 0;
  readonly fields = 'nome,name,description,version,homepage';
 // readonly fields = 'nome';


  constructor(private http: HttpClient,
              private serviceNome: ServicosService,
              private route: ActivatedRoute,

              )    {}

  ngOnInit(): void {
    this.results1$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter((value: any) => value?.length > 1),
        debounceTime(200),
        distinctUntilChanged(),
        tap(value => console.log(value)),
        switchMap( value => this.http.get(this.SEARCH_URL, {
            params : {
              search: value,
              fields: this.fields
            }
        })),
        tap((res:any) => this.total = res.total),
        map((res: any)=> res.results1)

      );

  }

  onSearch() {
    let value = this.queryField.value;
    console.log(this.fields, this.queryField.value, this.SEARCH_URL+'?nome_like='+value);

    if (value && (value = value.trim()) !== '') {

    //  this.http.get<T>(`${this.API_URL}?placa=${placa}`).pipe(take(1));

      const params = {
        search: value,
        fields: this.fields
      }

      let params1 = new HttpParams();
      params1 = params1.set('search',value);
    //  params1.append
      params1 = params1.set('field', this.fields)


        const results1$ = this.route.params.subscribe(
          (params: any) => {
            const result1$ = this.serviceNome.loadByNomeServico(value);
            result1$.subscribe(ordemservico => {
               this.results1$ = result1$;
               
            })
          }
        )


/*
      this.results1$ = this.serviceNome.loadByNomeServico(value)
      .pipe(
        tap((res: any) => (this.total = res.total)),
        map((res: any) => res.results)
      );

*/

/*
      this.results1$ = this.http
        .get(
          this.SEARCH_URL+'?nome_like='+value) //            )
          //  params}) //            '?fields='+fields+'&search'+value)

        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
*/
    }
  }
}
