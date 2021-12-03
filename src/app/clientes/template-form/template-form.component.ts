import { distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';
import { FormValidations } from './../../shared/services/form.validation';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from 'src/app/shared/model/estado-br';
import { Cidade } from 'src/app/shared/model/cidade';
import { empty } from 'rxjs';
import { FormArray } from '@angular/forms';
import { VerificaEmailService } from 'src/app/shared/verifica-email.service';
import { Clientes2Service } from '../template-form-list/clientes2.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Location } from '@angular/common';
import { Input } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})

export class TemplateFormComponent extends BaseFormComponent implements OnInit {

  submitted: boolean = false;
  formulario!: FormGroup;
  estados : EstadoBr[] = [];
  cidades : Cidade[] =[];
  mandafiltro: any;


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private dropdownService: DropdownService,
              private cepService: ConsultaCepService,
              private verificaEmailService : VerificaEmailService,
              private service: Clientes2Service,
              private route: ActivatedRoute,
              private modal: AlertModalService,
              private location: Location
              ) {

                super()
               }

  updateForm(clientes: any) {

      this.formulario.patchValue({
        id : clientes.id,
        nome: clientes.nome,
        email: clientes.email,
        cpf: clientes.cpf,
        telefone : clientes.telefone,
        telefoneA: clientes.telefoneA,
        endereco: ({
          cep: clientes.endereco.cep,
          numero: clientes.endereco.numero,
          complemento: clientes.endereco.complemento,
          rua: clientes.endereco.rua,
          bairro: clientes.endereco.bairro,
          cidade: clientes.endereco.cidade,
          estado: clientes.endereco.estado

        }),


      })

   }

  ngOnInit(): void {


    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        this.mandafiltro = id;
        const clientes$ = this.service.loadById(id);
        clientes$.subscribe(clientes => {
         this.updateForm(clientes);
        })
      }
    )

    this.dropdownService.getEstadosBr()
    .subscribe(dados => this.estados = dados);


    this.formulario = this.formBuilder.group({
      id:[null],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null,[Validators.required, Validators.email]],
      cpf: [null],
      telefone: [null, [Validators.required, Validators.minLength(10)] ],
      telefoneA: [null],

      endereco:  this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

    })


    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCep(this.formulario.get('endereco.cep')?.value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
            tap(estado => console.log('NOVO Estado ', estado)),
            map(estado => this.estados.filter(e => e.sigla == estado)),
            map(estados => estados && estados.length > 0  ? estados[0].id : empty()),
            switchMap((estadoId: any) => this.dropdownService.getCidades(estadoId)),
            tap(console.log)

      )
      .subscribe(cidades => this.cidades = cidades);
  }


  reqiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map(v=> v.value)
        .reduce((total, current) => current ? total + current : total, 0)
      return totalChecked >= min ? null : {
          required: true
      };
    };
    return validator
  }

  submit() {
    let valueSubmit = Object.assign({}, this.formulario.value);

      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit)) //this.formulario.value
      .map(res => res)
      .subscribe(dados => {
        console.log(dados)
      // reseta o form
      this.formulario.reset();

      },
      (erro:any) => alert('err')
      );

  }

  onSubmit() {
    this.submitted = true;
    if (this.formulario.valid) {
      console.log('sumbit');
      let mesgSucess = 'Cliente Criado com Sucesso';
      let mesgError = 'Erro ao Criar Cliente tente novamente';

      if (this.formulario.value.id) {
        mesgSucess = 'Cliente Atualizado com Sucesso';
        mesgError = 'Erro ao atualizar Cliente tente novamente';

      }

      this.service.save(this.formulario.value).subscribe(
        sucess => {
          this.modal.showAlertSuccess(mesgSucess);
          this.location.back(); //console.log('sucesso'),
        },
        error => {
          this.modal.showAlertDanger(mesgError) //console.error(error),

        }
      );


    }
  }


  validarEmail(formControl:FormControl) {
    this.verificaEmailService.verificarEmail(formControl.value)
    .pipe (map ((emailExiste:any) => emailExiste ? {emailInvalido:true} : null))

  }

  /*
  consultaCep() {

    const cep =this.formulario.get('endereco.cep')?.value;

    if (cep !== '' && cep != null) {
      this.cepService.consultaCep(cep)
      ?.subscribe(dados => this.populaDadosForm(dados));

    }
  }
*/
  populaDadosForm(dados:any) {

        this.formulario.patchValue({
          endereco: {
            rua: dados.logradouro,
            // cep: dados.cep,
            complemento: dados.complemento,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          }
        });

  }

  resetaDadosdoForumulario () {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        // cep: dados.cep,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  onCancel() {
    this.location.back()
  }

}

//enderecodoservidor/formulario
