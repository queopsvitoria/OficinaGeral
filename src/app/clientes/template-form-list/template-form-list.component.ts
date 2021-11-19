import { Component, OnInit, ViewChild } from '@angular/core';
import { take, catchError, switchMap } from 'rxjs/operators'
import {  Observable  } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Clientes2Service } from './clientes2.service';
import { EMPTY, Subject } from 'rxjs';
import { Clientes } from '../clientes';
import { Location } from '@angular/common';

@Component({
  selector: 'app-template-form-list',
  templateUrl: './template-form-list.component.html',
  styleUrls: ['./template-form-list.component.css'],
  preserveWhitespaces: true

})

export class TemplateFormListComponent implements OnInit {

  bsModalRef! : BsModalRef;
  clientes$!:Observable<Clientes[]> ;
  error$ = new Subject<boolean>();
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  clientesSelecionado!: Clientes;
  constructor(  private service: Clientes2Service,
                private alertService: AlertModalService,
                private bsModalService: BsModalService,
                private router: Router,
                private location: Location,
                private route: ActivatedRoute) { }

  ngOnInit() {
    this.onRefresh();

  }

  onRefresh() {
    this.clientes$ = this.service.list()
    .pipe(
      catchError(error=> {
        console.error(error);
        this.handleErro();
        return EMPTY;

      })
    );

  }

  handleErro() {
      this.alertService.showAlertDanger('Erro ao carrega. ');

  }

  onEdit(id: any) {
      console.log(id);
      this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(clientes: any) {
      this.clientesSelecionado = clientes;
      const result$ = this.alertService.showConfirm('Confirmacao','Tem certeza que deseja remover esse ');
      result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(clientes.id) : EMPTY)
      )
      .subscribe(
        succees => {
          this.onRefresh();
          this.onDeclineDelete();
        },
        error =>  {
          this.alertService.showAlertDanger('Erro ao remover ');
          this.onDeclineDelete();

        }
      );
  }

  onConfirmeDelete() {
      this.service.remove(this.clientesSelecionado.id)

       .subscribe(
        succees => {
          this.onRefresh();
        },
        error =>  {
          this.alertService.showAlertDanger('Erro ao remover ');

        }

      );

  }

  onDeclineDelete(){
      this.deleteModalRef.hide();
  }

  onCancel() {
    this.location.back()
  }

}
