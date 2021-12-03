import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TemplateFormListComponent } from './template-form-list/template-form-list.component';
import { TemplateFormRoutes } from './template-form.routing';
import { CarroClienteComponent } from './carro-cliente/carro-cliente.component';
import { MatTabsModule } from '@angular/material/tabs';
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
    TemplateFormRoutes,
    MatTabsModule
  ]
})
export class TemplateFormModule { }
