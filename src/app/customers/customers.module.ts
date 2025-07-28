import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutCustomerComponent } from './pages/layout-customer/layout-customer.component';
import { PredictionsTableComponent } from './components/predictions-table/predictions-table.component';
import {CustomersRoutingModule} from "./customers-routing.module";
import {MaterialModule} from "../material/material.module";
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChartD3Component } from './components/chart-d3/chart-d3.component';



@NgModule({
  declarations: [
    LayoutCustomerComponent,
    PredictionsTableComponent,
    OrdersTableComponent,
    AddOrderComponent,
    ChartD3Component
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CustomersModule { }
