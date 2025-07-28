# Sales Date Prediction Frontend
<img width="7992" height="5994" alt="screenshot_3x_postspark_2025-07-27_20-27-04" src="https://github.com/user-attachments/assets/ac41b520-ebb0-49d2-8b95-7828ff8c8038" />

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.3.11.

## Requisitos previos

- Node.js (versión 18 o superior)
- Angular CLI instalado globalmente (`npm install -g @angular/cli`)

## Instalación

1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.


## Configuración del entorno

Las URLs base para las peticiones HTTP están definidas en los archivos de entorno ubicados en `src/environments/`:

- `environment.ts` (desarrollo)

Ejemplo de configuración en `environment.ts`:
```typescript
export const environment = {
  baseUrl: 'https://localhost:7239/api' //cambiar en caso de ser necesario
};
```
## Levantar el servidor de desarrollo

Ejecutar:

```
ng serve
```

Luego abrir el navegador en `http://localhost:4200/`. El servidor se recargará automáticamente al realizar cambios en los archivos del proyecto.


