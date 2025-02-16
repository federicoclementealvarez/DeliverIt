# Frontend docs

## Design System

El Design System fue hecho con estilos propios, siguiendo las buenas prácticas de UX/UI. También fueron seleccionados los colores y las fuentes con estilos modernos para hacer la aplicación atractiva visualmente.

En primera instancia se realizó un [prototipo](https://www.figma.com/design/0j1BtFdbNd0N27qJnXmrsi/DeliverIt?node-id=0-1&t=NMNRiMAqH6aNpSoK-1) con la aplicación Figma para probar el diseño antes de empezar con el desarrollo.

## Aplicación

El proyecto del frontend se realizó con el framework Angular en su versión 16.1.0 con el preprocesador Sass para los estilos de los componentes.

### Cómo instalar

1. Ir al directorio del proyecto: `cd Front-end App\DeliverItAngularProject`.
2. Instalar las dependencias: `npm install`.
3. Iniciar el servidor: `ng serve`.

### Entornos

Los distintos entornos que maneja la aplicación son configurados con el framework utilizado

- Desarrollo: `Front-end App\DeliverItAngularProject\src\environments\environment.development.ts`
- Producción: `Front-end App\DeliverItAngularProject\src\environments\environment.ts`. Se puede cambiar con una URL del respectivo backend desplegado.

### Autenticación y autorización

Al recibir el token del backend, se guardó en el sessionStorage del browser. Luego, se utilizó el interceptor provisto por framework para incluir el token en cada request para acceder a los recursos protegidos del backend. Además, los componentes accedidos a traves del Angular router también estan autorizados con los roles definidos en el backend.

## Tests automatizados

### Componentes

Están desarrollados con el framework de testing Jest y el paquete `@angular/core/testing`. Para ejecutarlos, usar el comando: `npm run test` en el directorio del proyecto.

### End-to-end

Están desarrollados con el framework Cypress. Para ejecutarlos, usar el comando: `npm run cy:open` en el directorio del proyecto y elegir la opción de testing de end-to-end.
