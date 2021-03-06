import { OrdemServicosService } from './../ordemservico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
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
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { MatInput } from '@angular/material/input';
import { AlertModalService } from './../../shared/alert-modal.service';

@Component({
  selector: 'app-ordem-form',
  templateUrl: './ordem-form.component.html',
  styleUrls: ['./ordem-form.component.css'],
  preserveWhitespaces: true

})
export class OrdemFormComponent implements OnInit {
  value = 'Clear me';
  submitted: boolean = false;
  formulario!: FormGroup;
  @Input() recebeFiltro: any;
  @Input() idclientesaida: any;
  @Input() idServicossaida: any;
  @Input() nomecliente: any;
  @Input() placacliente: any;
  @Input() modelocliente: any;


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

    this.formulario = this.fb.group({
      id:[null],
      idcliente:[null],
      placa: [null, [FormValidations.placaValidator]],
      descricao: [null, [FormValidations.servicosValidator]],
      modelo: [null],
      cliente: [this.nomecliente],
      quantidade: [null],
      descricaoservico: [null],
      vrunitario: [null],
      vrtotal: [null]


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


      this.formulario.get('descricaoservico')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status servico:', value)),
        switchMap(status => status === 'VALID' ?
          this.consultaPlaca(this.formulario.get('descricaoservico')?.value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

  }

  onSubmit() {
    this.submitted = true;
    console.log("carga ",this.formulario.value);


    if (this.formulario.valid) {
      console.log('sumbit');
      let mesgSucess = 'Ordem de Servico Criado com Sucesso';
      let mesgError = 'Erro ao Criar Ordem de Servico tente novamente';

      if (this.formulario.value.id) {
        mesgSucess = 'Ordem de Servico Atualizado com Sucesso';
        mesgError = 'Erro ao atualizar Ordem de Servico tente novamente';

      }

      this.OrdemServicosService.save(this.formulario.value).subscribe(
        sucess => {
          this.nomecliente = "teste";
          this.formulario.patchValue({
           idcliente: this.idclientesaida,
            nome: "NOME DO CLIENTE", //this.nomecliente,
            placa: "0000000",//this.placacliente,
            modelo: this.modelocliente
          })
          this.modal.showAlertSuccess(mesgSucess);
     //     this.location.back();
    // console.log('sucesso xxx crazy ',this.formulario.value);
      //    this.formulario.reset();

        },
        error => {
          this.modal.showAlertDanger(mesgError) //console.error(error),

        }
      );


    }


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
      modelo: dados[0].modelo,
      idcliente: this.idclientesaida,


    });

    this.consultaIdCliente();

}

populaComoBox(dados:any) {

  console.log(' dados dados dados ',dados[0]," nada nada mesmo");
  if (dados[0]==undefined) {
    console.log("dados vazios");
    return
  }
  this.idServicossaida = dados[0].id;

  this.formulario.patchValue({
    descricaoservico: dados[0].nome
  });

  this.onSearchService();



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
   this.formulario.patchValue({
    cliente: this.nomecliente

  });


}

onSearchService() {
  let value = this.queryField.value;
  console.log(this.fields, this.queryField.value, this.SEARCH_URL+'?nome_like='+value);

  console.log('entrei aqui '+value);

  if (value && (value = value.trim()) !== '') {

    const params = {
      search: value,
      fields: this.fields
    }

      const results1$ = this.route.params.subscribe(
        (params: any) => {
          const result1$ = this.serviceNome.loadByNomeServico(value);
          result1$.subscribe(ordemservico => {
             this.results1$ = result1$;

          })
        }
      )




  }
}


}
