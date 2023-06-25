import React from "react";
import HydratedTodos from '@/src/app/hydratedTodos';

export default async function Home() {
  return (
    <>
      <h1>Todo-List-App</h1>
      <HydratedTodos />
    </>
  );
}