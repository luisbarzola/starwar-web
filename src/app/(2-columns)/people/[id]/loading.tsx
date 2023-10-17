'use client'
import React from "react";
import {Progress} from "@nextui-org/react";

export default function App() {
  return (
    <>
    <h1>Cargando persona...</h1>
    <Progress
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
    />
    </>
  );
}
