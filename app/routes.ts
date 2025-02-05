import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),

  layout("layouts/app.tsx", [
    ...prefix("libros", [
      index("routes/books.tsx"),
      route(":bookId", "routes/book.tsx"),
    ]),

    route("/prestamos", "routes/loans.tsx"),
  ]),
] satisfies RouteConfig;
