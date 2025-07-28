import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CatalogResource } from '../interfaces/CatalogResource';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private baseUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) {}

  getCatalog<T>(resource: CatalogResource): Observable<T[]> {
    const url = `${this.baseUrl}/${resource}`;
    return this.http.get<ApiResponse<T[]>>(url).pipe(
      map((response) => {
        if (!response.isSuccess || !response.data) {
          throw new Error(response.message || `Error al obtener datos de ${resource}`);
        }
        return response.data;
      }),
      catchError((error) => {
        console.error(`Error en la petición del recurso '${resource}':`, error);
        return throwError(() => new Error(`No se pudieron obtener los datos de ${resource}.`));
      })
    );
  }
}
