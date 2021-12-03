import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { ServicosFormComponent  } from './servicos-form/servicos-form.component';
import { ServicoListComponent } from './servico-list/servico-list.component';

const routes: Routes = [
  { path: '', component: ServicoListComponent },
  {
    path: 'novo',
    component: ServicosFormComponent,
 //   resolve: {
 //     curso: CursoResolverGuard,
 //   },
  },
  {
    path: 'editar/:id',
    component: ServicosFormComponent,
    //resolve: {
    //  curso: CursoResolverGuard,
    //},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ServicosFormRoutes { }
