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
    ...prefix("prestamos", [
      index("routes/loans.tsx"),
      route(":loanId", "routes/loan.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
