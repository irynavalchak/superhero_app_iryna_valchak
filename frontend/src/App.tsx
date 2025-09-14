import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HeroDetailsPage from "./pages/HeroDetailsPage";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hero/:id" element={<HeroDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
