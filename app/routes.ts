import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),

  layout("layouts/app-layout.tsx", [
    ...prefix("libros", [
      index("routes/books.tsx"),
      route(":bookId", "routes/book.tsx"),
      route(":bookId/prestamo", "routes/loan-form.tsx"),
    ]),

    route("prestamos", "routes/loans.tsx"),

    ...prefix("admin", [
      route("solicitudes", "routes/requests.tsx"),
      route("prestamos", "routes/loans-management.tsx"),
      route("usuarios", "routes/users.tsx"),

      ...prefix("libros", [
        index("routes/books-management.tsx"),
        route(":bookId", "routes/book-edit.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
