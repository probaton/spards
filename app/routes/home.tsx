import type { Route } from "./+types/home";
import { Spards } from "../spards";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Spards" },
    { name: "description", content: "Spardify" },
  ];
}

export default function Home() {
  return <main><header><Spards /></header></main>;
}
