import { OrdemServicosService } from '../ordemservico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarrosService } from 'src/app/clientes/carros.service';
import { distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';
import { FormValidations } from '../../shared/services/form.validation';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Clientes2Service } from 'src/app/clientes/template-form-list/clientes2.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { MatInput } from '@angular/material/input';
import { AlertModalService } from '../../shared/alert-modal.service';

@Component({
  selector: 'app-ordem-form',
  templateUrl: './ordem-modelo.component.html',
  styleUrls: ['./ordem-form.component.css'],
  preserveWhitespaces: true

})
export class OrdemModelComponent implements OnInit {
  value = 'Clear me';
  submitted: boolean = false;
  formulariomodelo!: FormGroup;
  @Input() recebeFiltro: any;
  @Input() idclientesaida: any;
  @Input() idServicossaida: any;
  @Input() nomecliente: any;
  @Input() placacliente: any;
  @Input() modelocliente: any;
  @Input() mandafiltro: any;


  queryField = new FormControl();
  readonly SEARCH_URL =   'http://localhost:3000/servicos'; //'https://api.cdnjs.com/libraries';
  results1$: Observable<any> | undefined;
  readonly fields = 'nome';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private alertService: AlertModalService,
    private serviceCarro : CarrosService,
    private cepService : ConsultaCepService,
    private http: HttpClient,
    private serviceplaca: CarrosService,
    private serviceCliente: Clientes2Service,
    private serviceNome: ServicosService,
    private OrdemServicosService : OrdemServicosService,
    private modal: AlertModalService,


  ) { }

  ngOnInit() {


    console.log("******************************************* ", this.nomecliente);

    this.formulariomodelo = this.fb.group({

      placa: [null, [FormValidations.placaValidator]],
      modelo: [null],

    })

    this.formulariomodelo.get('placa')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status placa:', value)),
        switchMap(status => status === 'VALID' ?
          this.consultaPlaca(this.formulariomodelo.get('placa')?.value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});
/*

      this.formulariomodelo.get('descricaoservico')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status servico:', value)),
        switchMap(status => status === 'VALID' ?
          this.consultaPlaca(this.formulariomodelo.get('descricaoservico')?.value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});
*/
  }


  onCancel() {
    this.submitted = false;
    this.formulariomodelo.reset();
    this.location.back();
  }

  populaDadosForm(dados:any) {

    console.log(' dados dados dados ',dados[0]," nada nada mesmo");
    if (dados[0]==undefined) {
      console.log("dados vazios");
      return
    }
    this.idclientesaida = dados[0].idcliente;

    this.formulariomodelo.patchValue({
      modelo: dados[0].modelo,
      idcliente: this.idclientesaida,

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
  this.nomecliente = dados.nome;

   console.log(this.idclientesaida)
   this.formulariomodelo.patchValue({
    cliente: this.nomecliente

  });


}



}
