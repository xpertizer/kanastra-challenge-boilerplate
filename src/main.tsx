import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App"; // Importe o componente App
import { Layout } from "./components/ui/layout"; // Importe o componente Layout
import { FileProvider } from './components/ui/file';



//atualizer o state do contexto com initialState



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FileProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Layout>
      </FileProvider>
    </BrowserRouter>
  </React.StrictMode>
);
