import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-base-form',
  template: '<br>'
})
export abstract class BaseFormComponent implements OnInit {

formulario!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.submit()
    }else {

      console.log('Formulario invalido tudo errado');
      this.verificaValidacoesdoForm(this.formulario);
    }
  }

  abstract submit(): any;

  verificaValidacoesdoForm (formGroup:FormGroup | FormArray) {

    Object.keys(formGroup.controls).forEach(campo =>  {
      console.log(campo)
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesdoForm(controle);
      }
    })
  }

  resetar(){
    this.formulario.reset();

  }

  verificaValidTouched(campo: string) {
    return this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
  }


  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }





}
