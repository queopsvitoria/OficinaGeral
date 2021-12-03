import { AlertModalService } from './../../shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        const curso$ = this.service.loadById(id);
        curso$.subscribe(curso => {
          this.updateForm(curso);

      })

      }
    )

    this.form = this.fb.group({
        id:[null],
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250),
          ],
        ],
    });


  }

  updateForm(curso: any) {
    this.form.patchValue({
      id : curso.id,
      name: curso.name
    })
  }

  hasError(field: string) {
    return this.form.get(field)!.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log("carga ",this.form.value);
    if (this.form.valid) {
      console.log('sumbit');
      let mesgSucess = 'Atendente Criado com Sucesso';
      let mesgError = 'Erro ao Criar Atendente tente novamente';

      if (this.form.value.id) {
        mesgSucess = 'Atendente Atualizado com Sucesso';
        mesgError = 'Erro ao atualizar Atendente tente novamente';

      }

      this.service.save(this.form.value).subscribe(
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
    this.form.reset();
    this.location.back()
  }
}
