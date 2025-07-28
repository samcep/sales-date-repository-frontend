import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { CustomerPrediction } from '../interfaces/customer-prediction';
import { ApiResponse } from '../../shared/interfaces/ApiResponse';
import {environment} from "../../environments/environment";
import {CustomerOrder} from "../interfaces/customer-order";
import {CreateOrderRequest} from "../interfaces/create-order-request";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.baseUrl}/customers/predictions`;
  constructor(private http: HttpClient) {}
  getCustomerPredictions(): Observable<CustomerPrediction[]> {
    return this.http.get<ApiResponse<CustomerPrediction[]>>(this.apiUrl).pipe(
      map(response => {
        if (!response.isSuccess || !response.data) {
          throw new Error(response.message || 'Error desconocido al obtener predicciones');
        }
        return response.data;
      }),
      catchError(error => {
        console.error('Error en la petición:', error);
        return throwError(() => new Error('No se pudieron obtener las predicciones de clientes.'));
      })
    );
  }
  getOrdersByCustomerId(custId: number): Observable<CustomerOrder[]> {
    const url = `${environment.baseUrl}/customers/${custId}/orders`;
    return this.http.get<ApiResponse<CustomerOrder[]>>(url).pipe(
      map(response => {
        if (!response.isSuccess || !response.data) {
          throw new Error(response.message || 'Error al obtener órdenes del cliente');
        }
        return response.data;
      }),
      catchError(error => {
        console.error('Error en la petición de órdenes:', error);
        return throwError(() => new Error('No se pudieron obtener las órdenes del cliente.'));
      })
    );
  }

  createOrder(order: CreateOrderRequest): Observable<number> {
    const url = `${environment.baseUrl}/orders`;
    return this.http.post<ApiResponse<number>>(url, order).pipe(
      map(response => {
        if (!response.isSuccess) {
          const errors = response.errors?.join('\n') || response.message || 'Error al crear la orden';
          throw new Error(errors);
        }
        if (response.data == null) {
          throw new Error('No se recibió el ID de la orden creada.');
        }
        return response.data;
      }),
      catchError((error: unknown) => {
        let errorMessage = 'No se pudo crear la orden.';

        if (error instanceof HttpErrorResponse) {
          const apiError = error.error as ApiResponse<null>;
          if (apiError && typeof apiError === 'object') {
            errorMessage =
              apiError.errors?.join('\n') ||
              apiError.message ||
              error.message;
          } else {
            errorMessage = error.message;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.error('Error al crear la orden:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

}
