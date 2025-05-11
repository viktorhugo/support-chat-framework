import type { Route } from "./+types/home";
import { Navigate, redirect } from "react-router";

export function meta( {}: Route.MetaArgs ) {
  return [
    { title: "React Router App" },
    { name: "description", content: "Victor's React Router App" },
  ];
}

export const loader = async () => { // no se ha cargado el componente
  return redirect('/chat');
} 

export default function Home() {
  return <Navigate to="/chat" />
}
