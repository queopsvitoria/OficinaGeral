import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicoListComponent } from './servico-list/servico-list.component';
import { ServicosFormComponent } from './servicos-form/servicos-form.component';
import { ServicosFormRoutes } from './servicos.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ServicosFormRoutes
  ],
  declarations: [
    ServicosFormComponent,
    ServicoListComponent
  ]
})
export class ServicosModule { }
