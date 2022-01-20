import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'busca-reativa' },//templateFormList

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
  },
  {
    path: 'carroClienteForm',
    loadChildren: () => import('./clientes/carro-cliente.module').then(m => m.CarroClienteFormModule)
  },
  {
    path: 'busca-reativa',
    loadChildren: () => import('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule)
  },
  {
    path: 'input-material',
    loadChildren: () => import('./input-form-example/input-form-example.module').then(m => m.InputFormExampleModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
