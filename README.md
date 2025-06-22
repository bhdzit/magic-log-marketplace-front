# MagicLog (Frontend)

Este es el repositorio del frontend para la aplicación MagicLog, una moderna plataforma de comercio electrónico construida con las últimas tecnologías web.

## 📜 Descripción

MagicLog es una aplicación web que ofrece a los usuarios una interfaz limpia y rápida para explorar, buscar y registrarse en la plataforma. El proyecto está diseñado para ser escalable, mantenible y ofrecer una experiencia de usuario fluida.

### ✨ Características Principales

-   **Exploración de Productos:** Visualiza productos destacados y una lista completa de todos los artículos.
-   **Búsqueda Integrada:** Encuentra productos fácilmente a través de una barra de búsqueda intuitiva.
-   **Autenticación de Usuarios:** Flujo de registro de usuarios a través de un diálogo modal.
-   **Diseño Responsivo:** Interfaz estilizada con Tailwind CSS, adaptada para cualquier dispositivo.
-   **Gestión de Estado Global:** Manejo de estados complejos (como diálogos) a través de Zustand.

## 🛠️ Stack Tecnológico

-   **Framework:** [React](https://reactjs.org/)
-   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
-   **Bundler:** [Vite](https://vitejs.dev/)
-   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
-   **Gestión de Formularios:** [React Hook Form](https://react-hook-form.com/)
-   **Gestión de Estado:** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Cliente HTTP:** [Axios](https://axios-http.com/)

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

-   Node.js (v18 o superior)
-   npm o yarn

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/magiclog-front.git
    ```

2.  **Navegar al directorio del proyecto:**
    ```bash
    cd front
    ```

3.  **Instalar dependencias:**
    ```bash
    npm install
    ```

4.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto, copiando el formato de `.env.example` (si existe). Agrega la URL de tu API backend.

    ```env
    VITE_API_URL=http://localhost:8000/api
    ```

5.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    El proyecto estará disponible en `http://localhost:5173` (o el puerto que Vite indique).

## 📦 Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Compila la aplicación para producción.
-   `npm run preview`: Previsualiza la build de producción localmente.
