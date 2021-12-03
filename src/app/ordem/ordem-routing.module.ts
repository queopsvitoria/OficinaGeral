import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdemFormComponent } from './ordem-form/ordem-form.component';

const routes: Routes = [
  { path: '', component: OrdemFormComponent },
  {
    path: 'novo',
    component: OrdemFormComponent,
 //   resolve: {
 //     curso: CursoResolverGuard,
 //   },
  },
  {
    path: 'editar/:id',
    component: OrdemFormComponent,
    //resolve: {
    //  curso: CursoResolverGuard,
    //},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdemRoutingModule {}
