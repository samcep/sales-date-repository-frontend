import { Component } from '@angular/core';

@Component({
  selector: 'customer-layout-customer',
  templateUrl: './layout-customer.component.html',
  styles: `
    .dark-toolbar {
      background-color: #333;
      color: white;
    }

    .example-spacer {
      flex: 1 1 auto;
    }

    .logo {
      height: 70px;
      margin-right: 16px;
    }

    .white-icon {
      color: white;
    }

    .white-icon:hover {
      color: rgb(135, 14, 14);
    }
  `
})
export class LayoutCustomerComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './predictions' },
    { label: 'Grafico D3', icon: 'label', url: './charts' },
  ]
}
