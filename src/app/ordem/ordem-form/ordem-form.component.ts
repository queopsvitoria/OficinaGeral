import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarrosService } from 'src/app/clientes/carros.service';
import { distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';
import { FormValidations } from './../../shared/services/form.validation';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Clientes2Service } from 'src/app/clientes/template-form-list/clientes2.service';

@Component({
  selector: 'app-ordem-form',
  templateUrl: './ordem-form.component.html',
  styleUrls: ['./ordem-form.component.css'],
  preserveWhitespaces: true

})
export class OrdemFormComponent implements OnInit {
  submitted: boolean = false;
  formulario!: FormGroup;
  @Input() recebeFiltro: any;
  @Input() idclientesaida: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private alertService: AlertModalService,
    private serviceCarro : CarrosService,
    private cepService : ConsultaCepService,
    private http: HttpClient,
    private serviceplaca: CarrosService,
    private serviceCliente: Clientes2Service

  ) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      id:[null],
      placa: [null, [FormValidations.placaValidator]],
      modelo: [null]
    })

    this.formulario.get('placa')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status placa:', value)),
        switchMap(status => status === 'VALID' ?
          this.consultaPlaca(this.formulario.get('placa')?.value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

  }

  onSubmit() {

  }

  onCancel() {
    this.submitted = false;
    this.formulario.reset();
    this.location.back();
  }

  populaDadosForm(dados:any) {

    console.log(' dados dados dados ',dados[0]," nada nada mesmo");
    if (dados[0]==undefined) {
      console.log("dados vazios");
      return
    }
    this.idclientesaida = dados[0].idcliente;

    this.formulario.patchValue({
      modelo: dados[0].modelo
    });

    this.consultaIdCliente();

}

consultaPlaca(placa: string) {
 // console.log('Entrei aqui no negocio '+placa)
  this.route.params.subscribe(
    (params: any) => {
      const  clienteplaca$ = this.serviceplaca.loadByplaca(placa);
      clienteplaca$.subscribe(ordemservico => {
        this.populaDadosForm(ordemservico);
      })
    }
  )

  return of({})
}

consultaIdCliente() {
   console.log('Entrei aqui no negocio de consulta id Cliente '+this.idclientesaida)
   this.route.params.subscribe(
     (params: any) => {
       const  clienteplaca$ = this.serviceCliente.loadById(this.idclientesaida);
       clienteplaca$.subscribe(ordemservico => {
         console.log(ordemservico)
         this.populaDadosClienteForm(ordemservico);
       })
     }
   )

   return of({})
 }

 populaDadosClienteForm(dados:any) {

  console.log(' dados dados dados ',dados," nada nada mesmo");
  if (dados==undefined) {
    console.log("dados vazios");
    return
  }
  this.idclientesaida = dados.nome;
   console.log(this.idclientesaida)


}

}
