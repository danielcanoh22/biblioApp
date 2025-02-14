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
      // index("routes/loans.tsx"),
      route("libros", "routes/books-management.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
