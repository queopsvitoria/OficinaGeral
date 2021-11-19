import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateFormComponent } from './template-form/template-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TemplateFormListComponent } from './template-form-list/template-form-list.component';
import { TemplateFormRoutes } from './template-form.routing';
import {  ReactiveFormsModule } from '@angular/forms';
import { CarroClienteComponent } from './carro-cliente/carro-cliente.component';
@NgModule({
  declarations: [
     TemplateFormComponent,
     TemplateFormListComponent,
     CarroClienteComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TemplateFormRoutes
  ]
})
export class TemplateFormModule { }
