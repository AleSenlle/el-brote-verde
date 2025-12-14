# 🌱 El Brote Verde - E-commerce de Plantas

![El Brote Verde](https://img.shields.io/badge/El%20Brote%20Verde-E--commerce-brightgreen)
![TalentoTech](https://img.shields.io/badge/TalentoTech--Entrega-success)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Status](https://img.shields.io/badge/Status-✅%20Completado-success)

Una plataforma de e-commerce especializada en plantas, desarrollada como **entrega final** para TalentoTech.

## ✨ Características Generales

- **🌿 Catálogo de Plantas**: Consumo de APIs Trefle y MockAPI para mostrar especies
- **🛒 Carrito de Compras**: Funcionalidades básicas de e-commerce con Context API
- **🎨 Diseño Responsive**: Desarrollado con React, styled-components y CSS
- **🔍 Búsqueda y Filtros**: Navegación intuitiva con paginación y filtrado en tiempo real
- **📱 Interfaz React**: Componentes reutilizables y estado gestionado
- **🔐 Autenticación**: Sistema de login/register con rutas protegidas
- **🛠️ Panel Admin**: CRUD completo de productos con MockAPI
- **📊 SEO Optimizado**: Meta tags y accesibilidad con React Helmet

## 📚 Contexto del Proyecto y Requisitos de Entrega

### ✅ Requerimientos Implementados

<details>
<summary><strong>🛒 Requerimiento #1: Gestión del Carrito y Autenticación de Usuarios</strong></summary>

**Carrito de Compras con Context API:**
- ✅ Implementar un CarritoContext que gestione los productos agregados.
- ✅ Permitir agregar, eliminar y vaciar el carrito.
- ✅ Mantener el estado global con Context API.

**Autenticación de Usuarios:**
- ✅ Crear un AuthContext para manejar el estado de autenticación.
- ✅ Implementar un login simulado con localStorage.
- ✅ Restringir el acceso al carrito y otras secciones a usuarios autenticados con rutas protegidas.

</details>

<details>
<summary><strong>🔗 Requerimiento #2: CRUD de Productos con MockAPI</strong></summary>

**Formulario para Agregar Productos:**
- ✅ Implementar un formulario controlado con useState.
- ✅ Validar que los campos sean correctos: Nombre obligatorio, Precio mayor a 0 y Descripción mínima de 10 caracteres.
- ✅ Enviar los datos a MockAPI mediante una solicitud POST.

**Edición y Eliminación de Productos:**
- ✅ Permitir la edición de productos utilizando MockAPI y Context API.
- ✅ Mostrar mensajes de error y confirmaciones al usuario.
- ✅ Implementar un modal de confirmación antes de eliminar un producto.

**Manejo de Errores:**
- ✅ Mostrar mensajes de error en pantalla si hay problemas con la API.
- ✅ Manejar estados de carga y error al obtener los productos.

</details>

<details>
<summary><strong>🎨 Requerimiento #3: Optimización de Diseño y Responsividad</strong></summary>

**Diseño Responsivo con Bootstrap y Styled-components:**
- ✅ Implementar el sistema de grillas de Bootstrap para adaptar el contenido a distintos dispositivos.
- ✅ Usar styled-components para personalizar los estilos y hacer el código más modular.

**Interactividad Mejorada con React Icons y React Toastify:**
- ✅ Agregar iconos en botones y elementos interactivos con React Icons.
- ✅ Implementar React Toastify para mostrar notificaciones de éxito y error.

**SEO y Accesibilidad con React Helmet:**
- ✅ Modificar el <title> y <meta> con React Helmet para mejorar el SEO.
- ✅ Asegurar que los elementos interactivos tengan etiquetas ARIA para accesibilidad.

</details>

<details>
<summary><strong>🔍 Requerimiento #4: Funcionalidades de Búsqueda y Paginación</strong></summary>

**Barra de Búsqueda:**
- ✅ Implementar una barra de búsqueda que permita a los usuarios filtrar los productos por nombre o categoría.
- ✅ Asegurar que la búsqueda sea rápida y eficiente, mostrando los resultados conforme el usuario escribe.

**Paginador de Productos:**
- ✅ Implementar un paginador que divida los productos en varias páginas.
- ✅ Asegurar que los usuarios puedan navegar entre las páginas sin problemas, mejorando la experiencia de usuario.

</details>

<details>
<summary><strong>🚀 Requerimiento #5: Preparación para el Despliegue</strong></summary>

**Pruebas de Compatibilidad:**
- ✅ Verificar el funcionamiento en móviles, tablets y escritorios.
- ✅ Revisar tiempos de carga y experiencia de usuario.

**Optimización de Código:**
- ✅ Revisar el código y eliminar elementos innecesarios.
- ✅ Asegurar que el estado global esté bien gestionado.

**Documentación Básica:**
- ✅ Incluir instrucciones en el README.md sobre instalación y uso de la aplicación.

</details>

## 🛠️ Instalación

### Requisitos Previos
- Node.js (versión 16 o superior)
- Git (para clonar el repositorio)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/AleSenlle/el-brote-verde.git
   cd el-brote-verde
   ```
2. **Instalar dependencias**
   ```bash
   npm install
   ```
3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
4. **Abrir la aplicación**
   ```bash
   Abre el navegador
   Visita http://localhost:5173/
   ```

## 📱Como usar la aplicación

1. **Explorar el catalogo**
- En la pagina de inicio, usa la barra de búsqueda para encontrar plantas específicas
- Haz clic en "Explorar el catálogo completo" para ver todos los productos
- Usa los botones de sugerencias para búsquedas rápidas
2. **Agregar productos al carrito**
- Navega por el catálogo de plantas
- Haz clic en "Agregar al carrito" en cualquier producto
- Visualiza tu carrito en la esquina superior derecha
3. **Proceso de compra**
- Accede a tu carrito para revisar los productos
- Ajusta cantidades o elimina items si es necesario
- Procede al checkout para finalizar la compra

## 📸 Screenshots & Gifs de El Brote Verde

### Home Page
![Home Page](./screenshots/home.png)

### Funcionamiento general de la App
![Funcionamiento General de la App](./screenshots/GeneralPagina.gif)

### Loggin con Admin y cargado de productos
![Log con Admin y cargado de productos](./screenshots/CargarCatalogo.gif)

### Loggin con User y compra
![Log con User y compra](./screenshots/CompraUser.gif)

### Carrito Page
![Carrito Page](./screenshots/carrito.png)

