import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import { EMPTY, empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})

export class CursosListaComponent implements OnInit {


  bsModalRef! : BsModalRef;
  cursos$!:Observable<Curso[]> ;
  error$ = new Subject<boolean>();
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursoSelecionado!: Curso;

  constructor(
              private service: Cursos2Service,
              private alertService: AlertModalService,

              private bsModalService: BsModalService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
 //   this.service.list().subscribe(dados => this.cursos = dados);
  this.onRefresh();

  }

  onRefresh() {
    this.cursos$ = this.service.list()
    .pipe(
    //  map(),
    //  tap(),
    //  switchMap,
      catchError(error=> {
        console.error(error);
      //  this.error$.next(true);
        this.handleErro();
        return EMPTY;
        //return off

      })
    );

   // this.service.list().subscribe(
   //   dados => {
   //     console.log(dados)
   //   },
   //   error => console.error(error),
  //    () => console.log('Observable completo! ')
  //  );

    }

    handleErro() {
      this.alertService.showAlertDanger('Erro ao carrega. cursos');
  //    this.bsModalRef = this.bsModalService.show(AlertModalComponent);
  //    this.bsModalRef.content.type = 'danger';
  //    this.bsModalRef.content.message = 'Erro ao carregar Cursos';

    }

    onEdit(id: any) {
      console.log(id);
      this.router.navigate(['editar', id], {relativeTo: this.route});
    }

    onDelete(curso: any) {
      this.cursoSelecionado = curso;
      console.log("Buscando o id Perfeitto ",curso.id);

   //   this.deleteModalRef = this.bsModalService.show(this.deleteModal, {class: 'modal-sm'})
       const result$ = this.alertService.showConfirm('Confirmacao','Tem certeza que deseja remover esse curso');
      result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
      )
      .subscribe(
        succees => {
          this.onRefresh();
          this.onDeclineDelete();
        },
        error =>  {
          this.alertService.showAlertDanger('Erro ao remover cursos');
          this.onDeclineDelete();

        }
      );
    }

    onConfirmeDelete() {
      this.service.remove(this.cursoSelecionado.id)

       .subscribe(
        succees => {
          this.onRefresh();
      //    this.onDeclineDelete();
        },
        error =>  {
          this.alertService.showAlertDanger('Erro ao remover cursos');
       //   this.onDeclineDelete();

      }


      );

    }

    onDeclineDelete(){
      this.deleteModalRef.hide();
    }
}
