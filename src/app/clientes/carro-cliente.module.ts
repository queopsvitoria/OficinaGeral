import { TemplateFormListComponent } from './template-form-list/template-form-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { CarroClienteComponent } from './carro-cliente/carro-cliente.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TemplateFormComponent } from './template-form/template-form.component';
@NgModule({
  declarations: [

    ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatTabsModule


  ]
})
export class CarroClienteFormModule { }
