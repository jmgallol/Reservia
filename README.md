# Reservia - Frontend

Este es el frontend de la aplicación Reservia, desarrollado con Vue 3, Vite, TailwindCSS y TypeScript.

## Requisitos Previos

Asegúrate de tener instalado en tu sistema:

* [Node.js](https://nodejs.org/) (versión 22.18.0 o >= 24.12.0)
* npm (gestor de paquetes incluido con Node.js)

## Instalación y Ejecución Local

Para levantar el proyecto en tu entorno de desarrollo, sigue estos pasos:

1. **Clona el repositorio** y navega a la carpeta del frontend:

```bash
cd Frontend
```

2. **Instala las dependencias** del proyecto:

```bash
npm install
```

3. **Inicia el servidor de desarrollo**:

```bash
npm run dev
```

Una vez que el servidor esté corriendo, la consola mostrará una URL. Por defecto, suele ser:

```text
http://localhost:5173/
```

Abre ese enlace en tu navegador.

## Rutas Principales de la Aplicación

La aplicación está dividida en diferentes áreas según el tipo de usuario.

La ruta principal o de entrada es:

* **Ruta Principal (Pública):** `/`

  * Al ingresar a la raíz del sitio, el sistema redirige automáticamente a `/restaurants`, donde los usuarios pueden explorar y encontrar restaurantes.

### Rutas para Clientes

* `/auth`: Página de autenticación (Login/Registro).
* `/restaurants/:id`: Detalles de un restaurante específico para consultar información y realizar reservas.
* `/reservations`: Panel para gestionar las reservas. Requiere inicio de sesión.
* `/reviews`: Panel para ver y gestionar las reseñas. Requiere inicio de sesión.
* `/map`: Mapa gastronómico para explorar restaurantes cercanos. Requiere inicio de sesión.

### Rutas para Administradores

* `/admin`: Ruta principal de administración. Redirige automáticamente al Dashboard.
* `/admin/dashboard`: Estadísticas del restaurante. Requiere rol `admin`.
* `/admin/reservations`: Control y confirmación de reservaciones. Requiere rol `admin`.
* `/admin/restaurant`: Administración de la información pública del establecimiento. Requiere rol `admin`.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

* `npm run dev`: Inicia el entorno de desarrollo.
* `npm run build`: Compila la aplicación para producción.
* `npm run preview`: Previsualiza localmente la versión compilada de producción.
* `npm run lint`: Ejecuta las herramientas de linting del proyecto.
* `npm run format`: Ejecuta el formateo del código con Prettier.
