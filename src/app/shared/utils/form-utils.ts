import { AbstractControl } from '@angular/forms';

const fieldLabels: { [key: string]: string } = {
  empid: 'Empleado',
  shipperid: 'Transportador',
  shipname: 'Nombre del envío',
  shipaddress: 'Dirección de envío',
  shipcity: 'Ciudad de envío',
  orderdate: 'Fecha de orden',
  requireddate: 'Fecha requerida',
  shippeddate: 'Fecha de envío',
  freight: 'Flete',
  shipcountry: 'País de envío',
  productid: 'Producto',
  unitprice: 'Precio unitario',
  qty: 'Cantidad',
  discount: 'Descuento'
};

export function getErrorMessage(control: AbstractControl | null, controlName: string): string {
  if (!control || !control.errors) return '';

  const label = fieldLabels[controlName] || controlName;

  if (control.hasError('required')) {
    return `${label} es requerido`;
  }

  if (control.hasError('pattern')) {
    return `${label} tiene un formato inválido`;
  }

  if (control.hasError('min')) {
    return `${label} es menor al valor mínimo permitido`;
  }

  if (control.hasError('maxlength')) {
    return `${label} excede el largo máximo permitido`;
  }

  if (control.hasError('max')) {
    return `${label} excede el valor máximo permitido`;
  }

  return `${label} es inválido`;
}
