import { ModalModule } from 'ngx-bootstrap/modal';
import { ServicosModule } from './servicos/servicos.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'templateFormList' },

  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: 'templateForm',
    loadChildren: () => import('./clientes/template.module').then(m => m.TemplateFormModule)
  },
  {
    path: 'templateFormList',
    loadChildren: () => import('./clientes/template.module').then(m => m.TemplateFormModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule)
  },
  {
    path: 'servicosForm',
    loadChildren: () => import('./servicos/servicos.module').then(m => m.ServicosModule)
  },
  {
    path: 'ordemForm',
    loadChildren: () => import('./ordem/ordem.module').then(m => m.OrdemModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
