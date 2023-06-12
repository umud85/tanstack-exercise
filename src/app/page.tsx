import React from "react";
import Todos from '@/src/components/todos';

export default async function Home() {
  return (
    <>
      <h1>Todo-List-App</h1>
      <Todos />
    </>
  );
}