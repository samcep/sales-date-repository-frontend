import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () =>import('./customers/customers.module').then(m => m.CustomersModule),
  },
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'customers'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
