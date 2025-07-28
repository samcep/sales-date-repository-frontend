import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerService } from '../../services/customer.service';
import {CustomerOrder} from "../../interfaces/customer-order";

@Component({
  selector: 'customer-orders-table',
  templateUrl: './orders-table.component.html',
})
export class OrdersTableComponent implements OnInit {
  displayedColumns: string[] = ['orderid', 'requireddate', 'shippeddate', 'shipname', 'shipaddress', 'shipcity'];
  dataSource = new MatTableDataSource<CustomerOrder>();
  public customername: string= "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: { custid: number , customerName: string }
  ) {}

  ngOnInit() {
    this.customerService.getOrdersByCustomerId(this.data.custid).subscribe({
      next: (orders) => {
        this.dataSource.data = orders;
        this.customername  = this.data.customerName;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
