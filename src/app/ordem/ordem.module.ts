import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemFormComponent } from './ordem-form/ordem-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdemRoutingModule } from './ordem-routing.module';

@NgModule({
  declarations: [
    OrdemFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdemRoutingModule
  ]
})
export class OrdemModule { }
