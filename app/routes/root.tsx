import { redirect } from "react-router";

export function clientLoader() {
  return redirect("/login");
}

export default function Root() {
  return null;
}
