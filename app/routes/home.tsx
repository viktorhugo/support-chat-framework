import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta( {}: Route.MetaArgs ) {
  return [
    { title: "React Router App" },
    { name: "description", content: "Victor's React Router App" },
  ];
}

export default function Home() {
  return <Welcome />;
}
