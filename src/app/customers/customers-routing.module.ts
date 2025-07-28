import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutCustomerComponent} from "./pages/layout-customer/layout-customer.component";
import {PredictionsTableComponent} from "./components/predictions-table/predictions-table.component";
import {ChartD3Component} from "./components/chart-d3/chart-d3.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutCustomerComponent,
    children: [
      {
        path: 'predictions',
        component: PredictionsTableComponent
      },
      {
        path: 'charts',
        component: ChartD3Component
      },
      {
        path: '**',
        redirectTo: 'predictions',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
