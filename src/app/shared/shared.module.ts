import { AlertModalService } from './alert-modal.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownService } from './services/dropdown.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';

import { BaseFormComponent } from './base-form/base-form.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    AlertModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule

  ],
  exports: [
    FormDebugComponent,
    ErrorMsgComponent,
    CampoControlErroComponent,
    InputFieldComponent,
    AlertModalComponent
  ],
  providers:[
    DropdownService
  ]
  //entryComponents: [AlertModalComponent, ConfirmModalComponent]

})

export class SharedModule { }
