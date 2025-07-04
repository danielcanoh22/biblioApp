import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/root.tsx"),

  layout("routes/public-route.tsx", [route("login", "routes/login.tsx")]),

  layout("layouts/app-layout.tsx", [
    layout("routes/protected-route.tsx", [
      ...prefix("libros", [
        index("routes/books.tsx"),
        route(":bookId", "routes/book.tsx"),
        route(":bookId/prestamo", "routes/loan-form.tsx"),
      ]),

      ...prefix("prestamos", [
        index("routes/loans.tsx"),
        route(":loanId/eliminar", "routes/loan-delete.tsx"),
      ]),

      layout("routes/admin-route.tsx", [
        ...prefix("admin", [
          ...prefix("solicitudes", [
            index("routes/requests.tsx"),
            route(":requestId", "routes/request.tsx"),
          ]),
          route("prestamos", "routes/loans-management.tsx"),

          ...prefix("usuarios", [
            index("routes/users.tsx"),
            route(":userId/editar", "routes/user-edit.tsx"),
            route(":userId/eliminar", "routes/user-delete.tsx"),
          ]),

          ...prefix("libros", [
            index("routes/books-management.tsx"),
            route(":bookId/editar", "routes/book-edit.tsx"),
            route(":bookId/eliminar", "routes/book-delete.tsx"),
          ]),
        ]),
      ]),
    ]),
  ]),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
