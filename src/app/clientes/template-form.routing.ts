import { Routes, RouterModule } from '@angular/router';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TemplateFormListComponent } from './template-form-list/template-form-list.component';
import { NgModule } from '@angular/core';
const routes: Routes = [
  { path: '', component: TemplateFormListComponent },
  {
    path: 'novo',
    component: TemplateFormComponent,
 //   resolve: {
 //     curso: CursoResolverGuard,
 //   },
  },
  {
    path: 'editar/:id',
    component: TemplateFormComponent,
    //resolve: {
    //  curso: CursoResolverGuard,
    //},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TemplateFormRoutes { }
