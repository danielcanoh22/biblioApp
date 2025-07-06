## BiblioApp Frontend

Este repositorio contiene el código de la interfaz de usuario para el sistema de gestión de biblioteca. Es una SPA responsiva, construida utilizando React Router v7 como framework. La aplicación consume la [API del Backend](https://github.com/danielcanoh22/biblioApp-backend).

---

### 🚀 Tecnologías Utilizadas

Construcción de la interfaz de usuario:

- 💙 React
- 🎨 Tailwind CSS

Desarrollo robusto y tipado estático

- 🔰 TypeScript

Enrutamiento

- 🀄 React Router

---

### 🚀 Características Principales

- **Interfaz Moderna y Responsiva**: Construida con React y estilizada con Tailwind CSS para una experiencia de usuario fluida.
- **Enrutamiento Protegido por Roles**: Sistema de rutas anidadas que distingue entre:
  - **Rutas Públicas**: Accesibles para todos.
  - **Rutas Protegidas**: Solo para usuarios autenticados.
  - **Rutas de Administrador**: Solo para usuarios con el rol `admin`.
- **Notificaciones Dinámicas**: Feedback al usuario a través de notificaciones (toasts) con `React Hot Toast`.

---

### 🚀 Ejecución

**Prerrequisito:** El [Backend de la App](https://github.com/danielcanoh22/biblioApp-backend) debe estar configurado y en ejecución.

Para ejecutar el proyecto en local, seguir los siguientes pasos:

1. Clonar el repositorio

```bash
git clone https://github.com/danielcanoh22/biblioApp.git
```

2. Navegar al directorio del proyecto

```bash
cd NombreDirectorio
```

3. Instalar las dependencias

```bash
npm install
```

4. Iniciar el servidor de desarrollo

```bash
npm run dev
```
