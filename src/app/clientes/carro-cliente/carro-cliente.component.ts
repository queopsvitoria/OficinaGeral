import { CarrosService } from './../carros.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { Carros } from '../carro';
import {  Observable  } from 'rxjs';
import { take, catchError, switchMap } from 'rxjs/operators'
import { EMPTY, Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-carro-cliente',
  templateUrl: './carro-cliente.component.html',
  styleUrls: ['./carro-cliente.component.css'],
  preserveWhitespaces: true

})
export class CarroClienteComponent implements OnInit {
  submitted: boolean = false;
  formularioveiculo!: FormGroup;
  @Input() recebeFiltro: any;

  carros$!:Observable<Carros[]> ;
  carrosSelecionado!: Carros;
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;


  constructor(
    private fb: FormBuilder,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private service: CarrosService,
    private alertService: AlertModalService,


  ) {}

  ngOnInit() {

    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        const carros$ = this.service.loadById(id);
        carros$.subscribe(carros => {
          this.updateForm(carros);

      })

      }
    )

    this.formularioveiculo = this.fb.group({
      id:[null],
      idcliente: [this.recebeFiltro],
      placa: [null],
      modelo: [null]
    })
    this.onRefresh();

  }

  hasError(field: string) {
    return this.formularioveiculo.get(field)!.errors;
  }

  updateForm(carros: any) {
    this.formularioveiculo.patchValue({
      id : carros.id,
      idcliente: carros.idcliente,
      placa: carros.placa,
      modelo: carros.modelo
    })
  }


  onSubmit() {
    this.submitted = true;
    console.log("carga ",this.formularioveiculo.value);
    if (this.formularioveiculo.valid) {
      console.log('sumbit');
      let mesgSucess = 'Veiculo Criado com Sucesso';
      let mesgError = 'Erro ao Criar Veiculo tente novamente';

      if (this.formularioveiculo.value.id) {
        mesgSucess = 'Veiculo Atualizado com Sucesso';
        mesgError = 'Erro ao atualizar Veiculo tente novamente';

      }

      console.log('chegando la');

      this.service.save(this.formularioveiculo.value).subscribe(
        sucess => {
          this.modal.showAlertSuccess(mesgSucess);
     //     this.location.back(); //console.log('sucesso'),
          this.formularioveiculo.reset();

        },
        error => {
          this.modal.showAlertDanger(mesgError) //console.error(error),

        }
      );


    }

  }

  onDelete(carros: any) {
    this.carrosSelecionado = carros;
    const result$ = this.alertService.showConfirm('Confirmacao','Tem certeza que deseja remover esse ');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(carros.id) : EMPTY)
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
  this.service.remove(this.carrosSelecionado.id)

   .subscribe(
    succees => {
      this.onRefresh();
    },
    error =>  {
      this.alertService.showAlertDanger('Erro ao remover ');

    }

  );

}

handleErro() {
  this.alertService.showAlertDanger('Erro ao carrega. ');

}

onRefresh() {
  this.carros$ = this.service.list()
  .pipe(
    catchError(error=> {
      console.error(error);
      this.handleErro();
      return EMPTY;

    })
  );

}

onDeclineDelete(){
  this.deleteModalRef.hide();
}
}
