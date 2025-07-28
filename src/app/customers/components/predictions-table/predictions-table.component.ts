import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CustomerService } from '../../services/customer.service';
import { CustomerPrediction } from '../../interfaces/customer-prediction';
import { OrdersTableComponent } from '../orders-table/orders-table.component';
import {AddOrderComponent} from "../add-order/add-order.component";

@Component({
  selector: 'customer-predictions-table',
  templateUrl: './predictions-table.component.html',
})
export class PredictionsTableComponent implements OnInit {
  displayedColumns: string[] = ['customerName', 'lastOrderDate', 'nextPredictedOrder', 'actions'];
  dataSource = new MatTableDataSource<CustomerPrediction>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomerPredictions().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error al cargar predicciones', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(customerId: number , customerName: string) : void {
    this.dialog.open(OrdersTableComponent, {
      width: '80%',
      data: { custid: customerId  , customerName: customerName },
    });
  }

  createOrder(customerId: number , customerName: string): void {
    this.dialog.open(AddOrderComponent, {
      width: '80%',
      data: { custid: customerId  , customerName: customerName },
    });
  }
}
