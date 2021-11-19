import { fn } from '@angular/compiler/src/output/output_ast';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide : NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() classeCss: any;
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() type = 'text';
  @Input() control: any = new FormControl;
  @Input() isReadOnly = false;

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v:any ){
    if(v !== this.innerValue) {
      this.innerValue = v;
      this.OnChangeCb(v);
    }
  }
  constructor() { }

  OnChangeCb: (_:any) => void =() => {};
  OnTouchedCb: (_:any) => void =() => {};


  writeValue(v: any): void {
     this.value = v;
  };

  registerOnChange(fn: any): void {
    this.OnChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.OnTouchedCb = fn;
  }

  setDisabledState?(isDisabled : boolean) : void {
    this.isReadOnly = isDisabled;
  }

}
