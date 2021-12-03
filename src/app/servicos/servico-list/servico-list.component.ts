import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EMPTY, empty, Observable, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Servico } from '../servico';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {

  bsModalRef! : BsModalRef;
  servicos$!:Observable<Servico[]> ;
  error$ = new Subject<boolean>();
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  servicoSelecionado!: Servico;

  constructor(
    private service: ServicosService,
    private alertService: AlertModalService,

    private bsModalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
     this.onRefresh();

  }

  onRefresh() {
       this.servicos$ = this.service.list()
       .pipe(

         catchError(error=> {
           console.error(error);
           this.handleErro();
           return EMPTY;

         })
       );

  }

  handleErro() {
    this.alertService.showAlertDanger('Erro ao carrega. Serviços');
  }

  onEdit(id: any) {
    console.log(id);
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(servico: any) {
    this.servicoSelecionado = servico;
    console.log("Buscando o id Perfeitto ",servico.id);

 //   this.deleteModalRef = this.bsModalService.show(this.deleteModal, {class: 'modal-sm'})
     const result$ = this.alertService.showConfirm('Confirmacao','Tem certeza que deseja remover esse Serviços');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(servico.id) : EMPTY)
    )
    .subscribe(
      succees => {
        this.onRefresh();
        this.onDeclineDelete();
      },
      error =>  {
        this.alertService.showAlertDanger('Erro ao remover Serviços');
        this.onDeclineDelete();

      }
    );
  }

  onConfirmeDelete() {
    this.service.remove(this.servicoSelecionado.id)

     .subscribe(
      succees => {
        this.onRefresh();
      },
      error =>  {
        this.alertService.showAlertDanger('Erro ao remover Servicos');

    }


    );

  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }
}
