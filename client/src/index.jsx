import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { LoginContextProvider } from "./contexts/LoginContext"
import NavBar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import MovieDetail from "./pages/MovieDetail/MovieDetail"
import BackOffice from "./pages/BackOffice/BackOffice"

const App = () => {
  return (
    <LoginContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/back-office" element={<BackOffice />} />
          <Route path="/:movieId" element={<MovieDetail />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </LoginContextProvider>
  );
};

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)
root.render(<App />)