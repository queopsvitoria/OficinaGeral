import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ServicosService } from '../servicos.service';
import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-servicos-form',
  templateUrl: './servicos-form.component.html',
  styleUrls: ['./servicos-form.component.css']
})
export class ServicosFormComponent extends BaseFormComponent implements OnInit {
  submitted: boolean = false;
  formulario!: FormGroup;

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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private service: ServicosService,
    private route: ActivatedRoute,
    private modal: AlertModalService,
    private location: Location

  ) { super() }

  ngOnInit() {

    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        const servicos$ = this.service.loadById(id);
        servicos$.subscribe(servico => {
          this.updateForm(servico);

      })

      }
    )

    this.formulario = this.formBuilder.group({
        id:[null],
        nome: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        qtde:[null],
        valorcompra:[null],
        valorvenda:[null],
        tempomedio:[null]
    });


  }



  updateForm(servico: any) {
    this.formulario.patchValue({
      id : servico.id,
      nome: servico.nome,
      valorcompra: servico.valorcompra,
      valorvenda: servico.valorvenda,
      qtde : servico.qtde,
      tempomedio: servico.tempomedio

    })
  }

  hasError(field: string) {
    return this.formulario.get(field)!.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log("carga ",this.formulario.value);
    if (this.formulario.valid) {
      console.log('sumbit');
      let mesgSucess = 'Serviço Criado com Sucesso';
      let mesgError = 'Erro ao Criar Serviço tente novamente';

      if (this.formulario.value.id) {
        mesgSucess = 'Serviço Atualizado com Sucesso';
        mesgError = 'Erro ao atualizar Serviço tente novamente';

      }

      console.log(this.formulario.value);

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

  onCancel() {
    this.submitted = false;
    this.formulario.reset();
    this.location.back()
  }

}
