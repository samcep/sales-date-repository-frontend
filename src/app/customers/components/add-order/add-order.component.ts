import {Component, OnInit , Inject} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
} from '@angular/material/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {provideNativeDateAdapter} from "@angular/material/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {CatalogService} from "../../../shared/Services/catalog.service";
import {ApiResponse} from "../../../shared/interfaces/ApiResponse";
import {Employee, Product, Shipper} from "../../../shared/interfaces/catalogs";
import {getErrorMessage} from "../../../shared/utils/form-utils";
import {CreateOrderRequest} from "../../interfaces/create-order-request";
import {CustomerService} from "../../services/customer.service";


@Component({
  selector: 'customer-add-order',
  templateUrl: './add-order.component.html',
  styles: ``,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
})
export class AddOrderComponent implements OnInit {

  orderForm: FormGroup;
  customerName: string  ;
  employees: Employee[] = [];
  shippers: Shipper[] = [];
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { custid: number , customerName: string }
  ) {
    this.customerName = data.customerName;
    this.orderForm = this.fb.group({
      empid: ['', Validators.required],
      shipperid: ['', Validators.required],
      shipname: ['', Validators.required],
      shipaddress: ['', Validators.required],
      shipcity: ['', Validators.required],
      orderdate: ['', [Validators.required]],
      requireddate: ['', [Validators.required]],
      shippeddate: ['', [Validators.required]],
      freight: [
        '',
        [
          Validators.required,
          Validators.min(0)
        ],
      ],
      shipcountry: ['', Validators.required],
      productid: ['', Validators.required],
      unitprice: [
        '',
        [
          Validators.required,
          Validators.min(0),
        ],
      ],
      qty: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ],
      ],
      discount: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(1)
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.loadProducts();
    this.loadShippers();
    this.loadEmployees();
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const order: CreateOrderRequest = this.orderForm.value;
      order.custid = this.data.custid;
      this.customerService.createOrder(order).subscribe({
        next: (response) => {
          if (response) {
            this.showMessage(`Order #${response} created successfully`);
          }
        },
        error: (error) => {
          this.showMessage(error.message);
        },
      });
    } else {
      this.showMessage(
        'Datos invalidos! Por favor revisar los datos ingresados'
      );
    }
  }
  loadShippers() {
    this.catalogService.getCatalog<Shipper>('shippers').subscribe(
      (data) => {
        this.shippers = data;
      },
      (error) => {
        console.error('Error loading shippers', error);
      }
    );
  }
  loadProducts() {
    this.catalogService.getCatalog<Product>('products').subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  loadEmployees() {
    this.catalogService.getCatalog<Employee>('employees').subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error loading employees', error);
      }
    );
  }
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar'],
    });
  }

  verifyData(field: string) {
    return getErrorMessage(this.orderForm.get(field), field);
  }
}
