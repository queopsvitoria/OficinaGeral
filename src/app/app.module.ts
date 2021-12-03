import { OrdemModule } from './ordem/ordem.module';
import { ServicosModule } from './servicos/servicos.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CursosModule } from './cursos/cursos.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TemplateFormModule } from './clientes/template.module';
import { LoginComponent } from './login/login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CursosModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SharedModule,
    FormsModule,
    TemplateFormModule,
    ServicosModule,
    OrdemModule,
    BrowserAnimationsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
