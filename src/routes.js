import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Usuarios from "./Usuarios";
import Tarefas from "./Tarefas";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Usuarios />} path="/" exact />
        <Route element={<Tarefas />} path="/Tarefas/:id/todos" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
