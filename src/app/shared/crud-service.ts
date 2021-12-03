import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs/operators";


export class CrudService<T> {

  constructor(protected   http: HttpClient,
              private API_URL: string ) { }

  list() {
    console.log(this.API_URL)
    return this.http.get<T[]>(this.API_URL)
    .pipe(
      delay(50),
      tap(console.log),
    );
  }

  private update(record: any) {
    return this.http.put(`${this.API_URL}/${record['id']}`, record).pipe(take(1));
  }

  private create(record: T) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }


  loadByplaca(placa: any) {
    console.log('que porra e essa', placa)
    return this.http.get<T>(`${this.API_URL}?placa=${placa}`).pipe(take(1));
  }

  loadById(id: any) {
    console.log("loadById ",(`${this.API_URL}/${id}`));
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  save(record: any) {
    if (record['id']) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id: any){
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }

}
