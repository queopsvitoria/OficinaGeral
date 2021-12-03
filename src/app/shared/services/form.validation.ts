import { Form, FormArray, FormControl, FormGroup } from "@angular/forms";

export class FormValidations {
    static reqiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
   /*   const values = formArray.controls;
      let totalChecked = 0;
      for (let i = 0; i < values.length; i++) {
        if (values[i]. value) {
            totalChecked +=1
        }
        return totalChecked >= min ? null : {
          required: true
        };
      }
    };
    */
      const totalChecked = formArray.controls
        .map(v=> v.value)
        .reduce((total, current) => current ? total + current : total, 0)
      return totalChecked >= min ? null : {
          required: true
      };
    };
    return validator
  }


  static cepValidator(control: FormControl) {
    const cep = control.value;
    console.log(cep);
    if (cep && cep !== '') {
       const validacep = /^[0-9]{8}$/;
       return validacep.test(cep) ? null : { cepInvalido: true};

    }
    return null;
  }

  static placaValidator(control: FormControl) {
    const placa = control.value;
    console.log(placa);

    if (placa && placa !== '') {
       const validaplaca = /^[a-zA-Z0-9]{7}$/; //a-zA-Z0-9
       return validaplaca.test(placa) ? null : { placaInvalido: true};
    }

    return null;
  }

  
  static equalsTo(otherField:string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('E necessário informar um campo')
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);
/*
      if(!field) {
        throw new Error('E necessário informar um campo valido');

      }

      if(field.value !== formControl.value) {
        return {
          equalsTo: otherField
        }
      }
*/
      return null;
    };
    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {

    let config : any = {
      'required': `${fieldName} e Obrigatório`,
      'minlength' : `${fieldName} precisa ter no minimo ${validatorValue.requiredLength} caracteres `,
      'maxlength' : `${fieldName} precisa ter no maximo ${validatorValue.requiredLength} caracteres `,
      'CepInvalido':  `Cep Invalido.` ,
      'emailInvalido': 'Email já cadastrado!',
      'equalsTo': 'Campos não são iguais',
      'pattern': `Campo inválido`
    };

    return config[validatorName];

  }

}
