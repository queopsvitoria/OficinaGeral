import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TemplateFormListComponent } from './template-form-list/template-form-list.component';
import { TemplateFormRoutes } from './template-form.routing';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModelModule } from '../material-model/material-model.module';
import { MatInputModule } from '@angular/material/input';

import { CarroClienteComponent } from './carro-cliente/carro-cliente.component';
@NgModule({
  declarations: [
     TemplateFormComponent,
     CarroClienteComponent,
     TemplateFormListComponent


    ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TemplateFormRoutes,
    MatTabsModule,
    MatInputModule


  ]
})
export class TemplateFormModule { }
