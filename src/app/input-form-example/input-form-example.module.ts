import { MaterialModelModule } from './../material-model/material-model.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormExampleComponent } from './input-form-example.component';
import { InputFormRoutingModule } from './input-routing.module';
@NgModule({
  declarations: [
    InputFormExampleComponent
  ],
  imports: [
    CommonModule,
    MaterialModelModule,
    InputFormRoutingModule
  ]
})
export class InputFormExampleModule { }
