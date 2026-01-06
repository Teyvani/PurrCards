import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./app.css";

//Layout
import Header from "./components/Layout/Header.tsx";
import TestPage from "./pages/TestPage.tsx";
//Pages

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
