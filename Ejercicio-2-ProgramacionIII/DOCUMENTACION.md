# Documentación del Proyecto: Gestor de Películas con TypeScript

**Desarrollado por:** Juan Luis Echenique Gonzalez
**Fecha:** 12 de Diciembre de 2025

## 1. Descripción del Proyecto
Este proyecto es una aplicación web sencilla desarrollada para demostrar el uso de **TypeScript**, específicamente el uso de **Enumeraciones (Enums)**, tipado estático y manipulación del DOM.

La aplicación permite al usuario:
1.  Ingresar el nombre de una película.
2.  Seleccionar un Género de una lista predefinida (Enum).
3.  Seleccionar un País de una lista predefinida (Enum).
4.  Agregar la película a una lista visual en pantalla.

## 2. Tecnologías Utilizadas
*   **HTML5**: Estructura de la página.
*   **CSS3**: Estilos y diseño responsivo (Flexbox/Grid).
*   **TypeScript**: Lógica de programación, tipos y seguridad.
*   **Node.js & NPM**: Gestión de dependencias y automatización de tareas.

## 3. Estructura del Proyecto

```
Ejercicio-2-ProgramacionIII/
├── dist/               # Código JavaScript generado (compilado)
│   └── app.js
├── src/                # Código Fuente TypeScript
│   └── app.ts
├── index.html          # Interfaz principal
├── style.css           # Estilos visuales
├── package.json        # Configuración de dependencias y scripts
└── tsconfig.json       # Configuración del compilador TypeScript
```

## 4. Detalle de Archivos

### 4.1. Configuración (`tsconfig.json`)
Este archivo configura cómo TypeScript transforma el código a JavaScript comprensible por el navegador.
*   **target**: `ES2017` (Para soportar `Object.values`).
*   **outDir**: `./dist` (Carpeta de salida).
*   **strict**: `true` (Modo estricto para evitar errores).

### 4.2. Interfaz (`index.html`)
Contiene:
*   Un formulario con inputs y selects.
*   Un contenedor vacío (`#movieList`) donde se inyectan las películas.
*   Referencia al script compilado (`./dist/app.js`).

### 4.3. Estilos (`style.css`)
Define una interfaz limpia y moderna usando variables CSS (`:root`) para manejar la paleta de colores. Utiliza animaciones suaves (`keyframes`) al agregar nuevos elementos.

### 4.4. Lógica (`src/app.ts`)
Es el corazón de la aplicación.
*   **Enums**: Define `Genre` y `Country` para restringir los valores posibles.
*   **Clase Movie**: Molde para crear objetos de tipo película.
*   **Funciones**:
    *   `initOptions()`: Genera dinámicamente las opciones del menú <select> basándose en los Enums.
    *   `addMovie()`: Captura los datos, valida que no estén vacíos y crea el objeto.
    *   `renderMovie()`: Genera el HTML de la tarjeta y lo inserta en la página.

## 5. Cómo Ejecutar el Proyecto

### Requisitos previos
Tener instalado **Node.js**.

### Pasos
1.  Abrir la terminal en la carpeta del proyecto.
2.  Instalar dependencias (solo la primera vez):
    ```bash
    npm install
    ```
3.  Compilar el código TypeScript:
    ```bash
    npm run build
    ```
4.  Iniciar el servidor local:
    ```bash
    npm start
    ```
5.  El navegador se abrirá automáticamente mostrando la aplicación.
