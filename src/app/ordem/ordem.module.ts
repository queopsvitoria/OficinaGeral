import { OrdemModelComponent } from './ordem-form/ordem-modelo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemFormComponent } from './ordem-form/ordem-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdemRoutingModule } from './ordem-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    OrdemFormComponent,
    OrdemModelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdemRoutingModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule
  ]
})
export class OrdemModule { }
