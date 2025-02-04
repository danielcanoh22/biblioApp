import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // index("routes/home.tsx"),
  layout("layouts/appLayout.tsx", [
    route("/libros", "routes/home.tsx"),
    route("/prestamos", "routes/loans.tsx"),
  ]),
] satisfies RouteConfig;
